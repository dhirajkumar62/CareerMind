

import mongoose from "mongoose";

const skillAssessmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    matchedCareers: [
      {
        career: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Career",
        },
        score: Number,
      },
    ],

    identifiedSkillGaps: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("SkillAssessment", skillAssessmentSchema);