

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    educationLevel: {
      type: String,
      enum: ["10th", "12th", "College", "Graduate", "Other"],
      required: true,
    },

    interests: [
      {
        type: String,
      },
    ],

    strengths: [
      {
        type: String,
      },
    ],

    aspirations: [
      {
        type: String,
      },
    ],

    mindsetType: {
      type: String,
      enum: ["Analytical", "Creative", "Practical", "Entrepreneurial", "Explorative"],
    },

    currentSkills: [
      {
        type: String,
      },
    ],

    roadmap: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Roadmap",
    },

    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    otp: {
      type: String,
    },

    otpExpires: {
      type: Date,
    },

    resetPasswordOtp: {
      type: String,
    },

    resetPasswordExpires: {
      type: Date,
    },

    isProfileComplete: {
      type: Boolean,
      default: false,
    },
    avatarUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);