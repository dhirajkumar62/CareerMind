
import mongoose from "mongoose";

const milestoneSchema = new mongoose.Schema({
  month: Number,

  skills: [String],

  projects: [String],

  resources: [String],

  completed: {
    type: Boolean,
    default: false,
  },
});

const roadmapSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    careerPath: {
      type: String,
      required: true,
    },

    duration: {
      type: String,
      enum: ["3 Months", "6 Months", "1 Year"],
      required: true,
    },

    skillGap: [
      {
        type: String,
      },
    ],

    milestones: [milestoneSchema],

    progressPercentage: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Roadmap", roadmapSchema);