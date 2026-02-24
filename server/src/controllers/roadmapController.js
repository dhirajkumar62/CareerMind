import { generateRoadmapForUser } from "../services/roadmapService.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createRoadmap = asyncHandler(async (req, res) => {
    const { careerId, duration } = req.body;

    if (!careerId || !duration) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const roadmap = await generateRoadmapForUser(
        req.user._id,
        careerId,
        duration
    );

    res.status(201).json(roadmap);
});
