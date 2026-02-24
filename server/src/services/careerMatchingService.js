import Career from "../models/Career.js";
import { generateAIResponse } from "./aiService.js";

export const calculateCareerMatches = async (user, customPrompt = null) => {
  const systemContext = `You are an expert career counselor AI for CareerMinds.
Your job is to analyze the user's profile and recommend exactly 5 highly tailored career paths.
You MUST format your response as a valid JSON array of objects. Do not include markdown formatting like \`\`\`json.
Each object in the array MUST contain exactly these fields:
- "title": string (The name of the career)
- "description": string (A short, compelling summary of why this matches the user)
- "requiredSkills": array of strings (5-10 core skills required for this career)
- "averageSalary": string (e.g., "$80,000 - $120,000" or "₹10 LPA - ₹20 LPA")
- "industryDemand": string (MUST be exactly "High", "Medium", or "Low")
- "jobTypes": array of strings (Select from exactly: "Job", "Freelance", "Remote", "Startup")
- "matchScore": number (A score from 1-100 indicating how well this career fits the user's profile)
`;

  let userData = `
User Profile:
- Education Level: ${user.educationLevel || "Not Specified"}
- Aspirations/Goals: ${user.aspirations?.length > 0 ? user.aspirations.join(", ") : "Not Specified"}
- Interests: ${user.interests?.join(", ") || "None"}
- Strengths: ${user.strengths?.join(", ") || "None"}
- Current Skills: ${user.currentSkills?.join(", ") || "None"}
- Mindset/Work Style: ${user.mindsetType || "Not Specified"}
`;

  if (customPrompt) {
    userData += `\nThe user has provided a custom request for career generation: "${customPrompt}"\nPlease generate 5 unique career paths that strongly align with this custom request, while keeping their profile in mind. Output ONLY a valid JSON array.`;
  } else {
    userData += `\nBased on these specific details (ESPECIALLY their Aspirations), generate the top 5 dynamic career recommendations. Ensure you incorporate real-world constraints and futuristic roles where appropriate. Output ONLY a valid JSON array.`;
  }

  process.env.DEBUG && console.log("Generating careers with prompt:", customPrompt || "Default");

  try {
    const aiText = await generateAIResponse({
      systemContext,
      messages: [{ role: "user", content: userData }],
    });

    // Robust JSON extraction
    const jsonStringMatch = aiText.match(/\[[\s\S]*\]/);
    if (!jsonStringMatch) {
      throw new Error("Could not extract JSON array from AI response.");
    }

    const careersGenerated = JSON.parse(jsonStringMatch[0]);

    if (!Array.isArray(careersGenerated) || careersGenerated.length === 0) {
      throw new Error("AI returned empty or invalid array.");
    }

    const results = [];

    for (const aiCareer of careersGenerated) {
      if (!aiCareer.title) continue;

      let careerDoc = await Career.findOne({
        title: { $regex: new RegExp(`^${aiCareer.title}$`, 'i') }
      });

      if (!careerDoc) {
        careerDoc = await Career.create({
          title: aiCareer.title,
          description: aiCareer.description || "A highly requested career path.",
          requiredSkills: aiCareer.requiredSkills || [],
          averageSalary: aiCareer.averageSalary || "Market standard",
          industryDemand: ["High", "Medium", "Low"].includes(aiCareer.industryDemand) ? aiCareer.industryDemand : "Medium",
          jobTypes: (aiCareer.jobTypes || []).filter(jt => ["Job", "Freelance", "Remote", "Startup"].includes(jt)),
        });
      }

      const userSkillsLower = user.currentSkills?.map(s => s.toLowerCase().trim()) || [];
      const skillGap = careerDoc.requiredSkills.filter(
        reqSkill => !userSkillsLower.includes(reqSkill.toLowerCase().trim())
      );

      results.push({
        career: careerDoc._id,
        title: careerDoc.title,
        score: aiCareer.matchScore || 85,
        skillGap,
        description: careerDoc.description,
        requiredSkills: careerDoc.requiredSkills,
        averageSalary: careerDoc.averageSalary
      });
    }

    return results.sort((a, b) => b.score - a.score).slice(0, 5);

  } catch (error) {
    console.error("AI Career Matching failed:", error.message);
    throw new Error("Failed to generate careers. Please try again.");
  }
};