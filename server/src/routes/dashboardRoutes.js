import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  getDashboard,
  updateMilestoneStatus,
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/", protect, getDashboard);

router.put("/milestone/:milestoneId", protect, updateMilestoneStatus);

export default router;