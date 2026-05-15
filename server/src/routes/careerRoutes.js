import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  getAllCareers,
  getCareerDetails,
  generateCustomCareers,
} from "../controllers/careerController.js";

const router = express.Router();

router.get("/", protect, getAllCareers);
router.get("/:careerId", protect, getCareerDetails);
router.post("/custom", protect, generateCustomCareers);

export default router;