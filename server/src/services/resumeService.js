import Resume from "../models/Resume.js";
import Roadmap from "../models/Roadmap.js";
import { generateAIResponse } from "./aiService.js";

export const generateResumeData = async (user) => {
    const roadmap = await Roadmap.findOne({ user: user._id });

    const systemContext = `You are a professional resume writer and career coach at CareerMinds.
Your goal is to generate a highly professional, ATS-optimized resume based on the user's profile and their current career roadmap.
You MUST format your response as a valid JSON object. Do not include markdown formatting like \`\`\`json.
The JSON object MUST contain exactly these fields:
- "personalInfo": { "fullName": string, "email": string, "phone": string, "location": string, "linkedin": string, "portfolio": string }
- "summary": string (A professional summary of 3-4 lines)
- "experience": array of objects { "title": string, "company": string, "location": string, "startDate": string, "endDate": string, "description": array of strings }
- "education": array of objects { "degree": string, "school": string, "location": string, "graduationDate": string }
- "skills": { "technical": array of strings, "soft": array of strings }
- "projects": array of objects { "name": string, "description": string, "link": string, "technologies": array of strings }

Note: Since this is for a student/early career platform, if they don't have work experience, focus on academic projects, internships (if any), and their career roadmap milestones as "Future Experience/Training".
`;

    let userData = `
User Profile:
- Name: ${user.name}
- Email: ${user.email}
- Education Level: ${user.educationLevel}
- Interests: ${user.interests?.join(", ")}
- Strengths: ${user.strengths?.join(", ")}
- Current Skills: ${user.currentSkills?.join(", ")}
- Mindset: ${user.mindsetType}
`;

    if (roadmap) {
        userData += `
Current Career Path: ${roadmap.careerPath}
Learned/Target Skills: ${roadmap.skillGap?.join(", ")}
Completed Milestones: ${roadmap.milestones?.filter(m => m.completed).map(m => m.projects.join(", ")).join("; ")}
`;
    }

    userData += `\nGenerate a professional resume JSON based on this data. Highlight their potential and alignment with ${roadmap?.careerPath || "their interests"}. Output ONLY a valid JSON object.`;

    try {
        const aiText = await generateAIResponse({
            systemContext,
            messages: [{ role: "user", content: userData }],
        });

        const jsonStringMatch = aiText.match(/\{[\s\S]*\}/);
        if (!jsonStringMatch) {
            throw new Error("Could not extract JSON from AI response.");
        }

        const resumeData = JSON.parse(jsonStringMatch[0]);

        // Upsert the resume in database
        const updatedResume = await Resume.findOneAndUpdate(
            { user: user._id },
            { ...resumeData, user: user._id, lastGenerated: new Date() },
            { upsert: true, new: true }
        );

        return updatedResume;
    } catch (error) {
        console.error("Resume generation service failed:", error.message);
        throw new Error("Failed to generate resume.");
    }
};
