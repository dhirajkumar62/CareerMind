import { getPortfolioData, updatePortfolioData } from "../services/portfolioService.js";

export const getPortfolio = async (req, res) => {
    try {
        const data = await getPortfolioData(req.user);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePortfolio = async (req, res) => {
    try {
        const portfolio = await updatePortfolioData(req.user, req.body);
        res.json(portfolio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
