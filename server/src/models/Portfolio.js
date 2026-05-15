import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        bio: {
            type: String,
        },
        headline: {
            type: String,
        },
        socialLinks: {
            github: String,
            linkedin: String,
            twitter: String,
            external: String,
        },
        layoutConfig: {
            theme: {
                type: String,
                default: "dark-glass",
            },
            bentoOrder: [String], // Array of component IDs to manage grid layout
        },
        showRoadmap: {
            type: Boolean,
            default: true,
        },
        showSkills: {
            type: Boolean,
            default: true,
        },
        featuredProjects: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Project", // Placeholder if we add a separate Project model later, or just store object IDs
            },
        ],
        customSections: [
            {
                title: String,
                content: String,
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.model("Portfolio", portfolioSchema);
