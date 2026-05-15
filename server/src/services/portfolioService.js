import Portfolio from "../models/Portfolio.js";
import Roadmap from "../models/Roadmap.js";

export const getPortfolioData = async (user) => {
    let portfolio = await Portfolio.findOne({ user: user._id });
    const roadmap = await Roadmap.findOne({ user: user._id });

    if (!portfolio) {
        // Initialize default portfolio based on user info
        portfolio = await Portfolio.create({
            user: user._id,
            headline: `Aspiring ${roadmap?.careerPath || "Professional"}`,
            bio: "Welcome to my professional portfolio.",
            layoutConfig: {
                theme: "dark-glass",
                bentoOrder: ["profile", "roadmap", "skills", "projects", "contact"],
            },
        });
    }

    return { portfolio, roadmap };
};

export const updatePortfolioData = async (user, updateData) => {
    const updatedPortfolio = await Portfolio.findOneAndUpdate(
        { user: user._id },
        updateData,
        { new: true, upsert: true }
    );
    return updatedPortfolio;
};
