import express from "express";
import { getResume, generateResume } from "../controllers/resumeController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getResume);
router.post("/generate", protect, generateResume);

export default router;
