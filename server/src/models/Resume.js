import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        personalInfo: {
            fullName: String,
            email: String,
            phone: String,
            location: String,
            linkedin: String,
            portfolio: String,
        },
        summary: {
            type: String,
        },
        experience: [
            {
                title: String,
                company: String,
                location: String,
                startDate: String,
                endDate: String,
                description: [String],
            },
        ],
        education: [
            {
                degree: String,
                school: String,
                location: String,
                graduationDate: String,
            },
        ],
        skills: {
            technical: [String],
            soft: [String],
        },
        projects: [
            {
                name: String,
                description: String,
                link: String,
                technologies: [String],
            },
        ],
        lastGenerated: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);
