import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { completeProfile, updateUserProfile, changePassword } from "../controllers/userController.js";

const router = express.Router();

router.put("/complete-profile", protect, completeProfile);
router.put("/profile", protect, updateUserProfile);
router.put("/change-password", protect, changePassword);

export default router;