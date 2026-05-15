import Career from "../models/Career.js";
import User from "../models/User.js";
import SkillAssessment from "../models/SkillAssessment.js";
import { calculateCareerMatches } from "../services/careerMatchingService.js";
import asyncHandler from "../utils/asyncHandler.js";


// Get all careers
export const getAllCareers = asyncHandler(async (req, res) => {
    const { demand, jobType } = req.query;

    let filter = {};

    if (demand) filter.industryDemand = demand;
    if (jobType) filter.jobTypes = jobType;

    const careers = await Career.find(filter);

    res.json(careers);
});


// Get single career with personalized skill gap
export const getCareerDetails = asyncHandler(async (req, res) => {
    const { careerId } = req.params;

    const career = await Career.findById(careerId);

    if (!career) {
        return res.status(404).json({ message: "Career not found" });
    }

    const user = await User.findById(req.user._id);

    const skillGap = career.requiredSkills.filter(
        (skill) => !user.currentSkills.includes(skill)
    );

    res.json({
        career,
        personalizedSkillGap: skillGap,
    });
});

// Generate custom careers from prompt
export const generateCustomCareers = asyncHandler(async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ message: "Prompt is required" });
    }

    const user = await User.findById(req.user._id);

    // Generate new careers based on prompt
    const matches = await calculateCareerMatches(user, prompt);

    // Append to the latest assessment so they show up in the dropdown
    const latestAssessment = await SkillAssessment.findOne({ user: user._id }).sort({ createdAt: -1 });
    if (latestAssessment) {
        const existingCareerIds = latestAssessment.matchedCareers.map(m => m.career.toString());
        for (const m of matches) {
            if (!existingCareerIds.includes(m.career.toString())) {
                latestAssessment.matchedCareers.push({ career: m.career, score: m.score });
            }
        }
        await latestAssessment.save();
    }

    res.json(matches);
});
