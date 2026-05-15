import User from "../models/User.js";
import Roadmap from "../models/Roadmap.js";
import SkillAssessment from "../models/SkillAssessment.js";
import asyncHandler from "../utils/asyncHandler.js";

// Get Dashboard Overview
export const getDashboard = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    const roadmap = await Roadmap.findOne({ user: user._id });
    const assessment = await SkillAssessment.findOne({ user: user._id }).populate({
        path: 'matchedCareers.career',
        model: 'Career'
    });

    res.json({
        user,
        roadmap,
        assessment,
    });
});

// Update Milestone Completion
export const updateMilestoneStatus = asyncHandler(async (req, res) => {
    const { milestoneId } = req.params;
    const roadmap = await Roadmap.findOne({ user: req.user._id });

    if (!roadmap) {
        return res.status(404).json({ message: "Roadmap not found" });
    }

    const milestone = roadmap.milestones.id(milestoneId);

    if (!milestone) {
        return res.status(404).json({ message: "Milestone not found" });
    }

    milestone.completed = !milestone.completed;

    // Recalculate progress
    const completedCount = roadmap.milestones.filter(
        (m) => m.completed
    ).length;

    roadmap.progressPercentage = Math.round(
        (completedCount / roadmap.milestones.length) * 100
    );

    await roadmap.save();

    res.json({
        message: "Milestone updated",
        progress: roadmap.progressPercentage,
    });
});
