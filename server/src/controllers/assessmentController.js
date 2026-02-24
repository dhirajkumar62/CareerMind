import SkillAssessment from "../models/SkillAssessment.js";
import User from "../models/User.js";
import { calculateCareerMatches } from "../services/careerMatchingService.js";
import asyncHandler from "../utils/asyncHandler.js";

export const generateAssessment = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user.isProfileComplete) {
        return res.status(400).json({ message: "Complete profile first" });
    }

    const matches = await calculateCareerMatches(user);

    const assessment = await SkillAssessment.create({
        user: user._id,
        matchedCareers: matches.map((m) => ({
            career: m.career,
            score: m.score,
        })),
        identifiedSkillGaps: matches[0]?.skillGap || [],
    });

    res.json({
        topMatches: matches,
        assessmentId: assessment._id,
    });
});
