import Career from "../models/Career.js";
import Roadmap from "../models/Roadmap.js";
import User from "../models/User.js";
import { generateAIResponse } from "./aiService.js";

export const generateRoadmapForUser = async (userId, careerId, duration) => {
  const user = await User.findById(userId);
  const career = await Career.findById(careerId);

  if (!user || !career) {
    throw new Error("User or Career not found");
  }

  // Determine number of months
  let months = 6;
  if (duration === "3 Months") months = 3;
  if (duration === "1 Year") months = 12;

  // Identify Skill Gap
  const userSkillsLower = user.currentSkills?.map(s => s.toLowerCase().trim()) || [];
  const skillGap = career.requiredSkills.filter(
    (skill) => !userSkillsLower.includes(skill.toLowerCase().trim())
  );

  const systemContext = `You are an expert career architect for CareerMinds.
Create a highly personalized, ${months}-month learning roadmap for a user who wants to become a ${career.title}.
The user's current profile:
- Aspirations: ${user.aspirations?.join(", ") || "None"}
- Current Skills: ${user.currentSkills?.join(", ") || "None"}
- Target Core Skills for this career: ${career.requiredSkills?.join(", ") || "Standard requirements"}
- Identified Skill Gaps: ${skillGap.length > 0 ? skillGap.join(", ") : "None significant"}

You MUST output exactly ${months} milestones as a valid JSON array of objects. Do not use markdown backticks like \`\`\`json.
Each object MUST have exactly these fields:
- "month": number (1 to ${months})
- "skills": array of strings (The specific skills to learn in this month)
- "projects": array of strings (1-2 practical project ideas to apply the skills)
- "resources": array of strings (Types of resources or specific famous courses/books to use)
Make the progression logical, addressing the skill gap first and then moving to advanced topics.`;

  let aiMilestones = [];

  try {
    const aiText = await generateAIResponse({
      systemContext,
      messages: [{ role: "user", content: "Generate the roadmap now." }],
    });

    const jsonString = aiText.replace(/^```(json)?/, '').replace(/```$/, '').trim();
    aiMilestones = JSON.parse(jsonString);

    // Validate structure roughly
    if (!Array.isArray(aiMilestones) || aiMilestones.length === 0) {
      throw new Error("Invalid AI output format");
    }

  } catch (error) {
    console.error("AI Roadmap Generation failed, falling back to basic generation:", error);
    // Fallback if AI fails: generate basic milestones based on skill gap chunks
    for (let i = 1; i <= months; i++) {
      aiMilestones.push({
        month: i,
        skills: i === 1 ? skillGap : [`Advanced ${career.title} Concept ${i}`],
        projects: [`Practical Application ${i}`],
        resources: ["Online documentation, tutorials"],
      });
    }
  }

  // Delete any existing roadmap for this user to avoid duplicates
  await Roadmap.deleteMany({ user: user._id });

  // Create new Roadmap
  const roadmap = await Roadmap.create({
    user: user._id,
    careerPath: career.title,
    duration,
    skillGap,
    milestones: aiMilestones,
    progressPercentage: 0,
  });

  user.roadmap = roadmap._id;
  await user.save();

  return roadmap;
};