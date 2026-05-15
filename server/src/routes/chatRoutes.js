import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { chatWithMentor } from "../controllers/chatController.js";

const router = express.Router();

router.post("/", protect, chatWithMentor);

export default router;