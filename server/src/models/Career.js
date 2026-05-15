

import mongoose from "mongoose";

const careerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
      required: true,
    },

    requiredSkills: [
      {
        type: String,
      },
    ],

    averageSalary: {
      type: String,
    },

    industryDemand: {
      type: String, // High, Medium, Low
      enum: ["High", "Medium", "Low"],
    },

    jobTypes: [
      {
        type: String,
        enum: ["Job", "Freelance", "Remote", "Startup"],
      },
    ],

    roadmapTemplates: {
      threeMonths: Object,
      sixMonths: Object,
      oneYear: Object,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Career", careerSchema);