import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { createRoadmap } from "../controllers/roadmapController.js";

const router = express.Router();

router.post("/create", protect, createRoadmap);

export default router;