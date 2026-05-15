import User from "../models/User.js";
import bcrypt from "bcryptjs";
import asyncHandler from "../utils/asyncHandler.js";

export const completeProfile = async (req, res) => {
  try {
    const { interests, strengths, mindsetType, currentSkills, aspirations } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.interests = interests;
    user.strengths = strengths;
    user.mindsetType = mindsetType;
    user.currentSkills = currentSkills;
    // Handle aspirations (split by comma if it's a string, otherwise use raw array)
    if (typeof aspirations === 'string') {
      user.aspirations = aspirations.split(",").map(s => s.trim()).filter(Boolean);
    } else if (Array.isArray(aspirations)) {
      user.aspirations = aspirations;
    }

    user.isProfileComplete = true;

    await user.save();

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   PUT /api/users/profile
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const { name, interests, avatarUrl } = req.body;

  if (name) user.name = name;
  if (avatarUrl) user.avatarUrl = avatarUrl;
  if (interests) {
    if (typeof interests === 'string') {
      user.interests = interests.split(",").map(s => s.trim()).filter(Boolean);
    } else if (Array.isArray(interests)) {
      user.interests = interests;
    }
  }

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    interests: updatedUser.interests,
    avatarUrl: updatedUser.avatarUrl,
    message: "Profile updated successfully"
  });
});

// @route   PUT /api/users/change-password
export const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    res.status(400);
    throw new Error("Please provide both old and new passwords");
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);

  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid old password");
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);

  await user.save();

  res.json({ message: "Password updated successfully" });
});