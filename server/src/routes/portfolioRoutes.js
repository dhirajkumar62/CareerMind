import express from "express";
import { getPortfolio, updatePortfolio } from "../controllers/portfolioController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getPortfolio);
router.put("/", protect, updatePortfolio);

export default router;
