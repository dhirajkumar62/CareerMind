import { generateResumeData } from "../services/resumeService.js";
import Resume from "../models/Resume.js";

export const getResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({ user: req.user._id });
        if (!resume) {
            return res.json(null);
        }
        res.json(resume);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const generateResume = async (req, res) => {
    try {
        const resume = await generateResumeData(req.user);
        res.json(resume);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
