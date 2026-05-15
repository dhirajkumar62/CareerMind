import ChatHistory from "../models/ChatHistory.js";
import User from "../models/User.js";
import Roadmap from "../models/Roadmap.js";
import SkillAssessment from "../models/SkillAssessment.js";
import { generateAIResponse } from "../services/aiService.js";
import asyncHandler from "../utils/asyncHandler.js";

export const chatWithMentor = asyncHandler(async (req, res) => {
    const { message } = req.body;
    const userId = req.user._id;

    if (typeof message !== "string" || !message.trim()) {
        return res.status(400).json({ message: "Message is required" });
    }

    // Fetch user
    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Fetch roadmap
    const roadmap = await Roadmap.findOne({ user: userId });

    // Fetch assessment
    const assessment = await SkillAssessment.findOne({ user: userId })
        .populate("matchedCareers.career");

    // Fetch or create chat history
    let chatHistory = await ChatHistory.findOne({ user: userId });

    if (!chatHistory) {
        chatHistory = await ChatHistory.create({
            user: userId,
            messages: [],
        });
    }

    // =============================
    // BUILD PROFESSIONAL AI CONTEXT
    // =============================

    const systemContext = `
You are Career Mind AI Mentor.

User Profile:
- Education Level: ${user.educationLevel}
- Mindset Type: ${user.mindsetType}
- Interests: ${user.interests?.join(", ")}
- Strengths: ${user.strengths?.join(", ")}

Roadmap:
- Career Path: ${roadmap?.careerPath || "Not selected"}
- Duration: ${roadmap?.duration || "N/A"}
- Progress: ${roadmap?.progressPercentage || 0}%
- Skill Gap: ${roadmap?.skillGap?.join(", ") || "None"}

Assessment Top Career Matches:
${
    assessment?.matchedCareers
        ?.map(
            (m) =>
                `- ${m.career?.title} (Score: ${m.score})`
        )
        .join("\n") || "Not available"
}

Instructions:
- Give practical, actionable advice.
- Be supportive and confidence-building.
- Suggest real-world projects and skills.
- If user feels lost, guide step-by-step.
- Keep answers career-focused.
`;

    // Add new user message
    const trimmedMessage = message.trim();

    chatHistory.messages.push({
        role: "user",
        content: trimmedMessage,
    });

    const formattedMessages = chatHistory.messages.map((m) => ({
        role: m.role,
        content: m.content,
    }));

    // Generate AI response
    let aiReply;

    try {
        aiReply = await generateAIResponse({
            systemContext,
            messages: formattedMessages,
        });
    } catch (error) {
        console.error("AI generation failed", error);
        aiReply = "I'm having trouble generating a response right now. Please try again in a moment.";
    }

    // Save AI reply
    chatHistory.messages.push({
        role: "assistant",
        content: aiReply,
    });

    await chatHistory.save();

    res.json({ reply: aiReply });
});
