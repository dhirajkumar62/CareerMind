import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { generateAssessment } from "../controllers/assessmentController.js";

const router = express.Router();

router.post("/generate", protect, generateAssessment);

export default router;