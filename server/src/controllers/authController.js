import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import { registerSchema } from "../validators/authValidator.js";
import sendEmail from "../utils/sendEmail.js";


// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// @route   POST /api/auth/register
export const registerUser = asyncHandler(async (req, res) => {
  const validatedData = registerSchema.parse(req.body);

  const { name, email, password, educationLevel } = validatedData;

  const userExists = await User.findOne({ email });

  if (userExists) {
    const error = new Error("User already exists");
    error.statusCode = 400;
    throw error;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  // Set expiry to 10 minutes from now
  const otpExpires = new Date(Date.now() + 10 * 60000);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    educationLevel,
    otp,
    otpExpires,
  });

  // Send Welcome & OTP Email
  const welcomeHTML = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
      <div style="background-color: #2563eb; padding: 32px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Welcome to CareerMinds!</h1>
      </div>
      <div style="padding: 32px; background-color: #ffffff;">
        <p style="font-size: 16px; color: #334155; margin-bottom: 24px;">Hi ${name},</p>
        <p style="font-size: 16px; color: #334155; margin-bottom: 24px; line-height: 1.6;">
          Thank you for joining CareerMinds! Please verify your email address the following one-time password (OTP):
        </p>
        <div style="text-align: center; margin: 32px 0;">
          <span style="display: inline-block; background-color: #f1f5f9; color: #0f172a; padding: 16px 32px; font-size: 32px; font-weight: bold; letter-spacing: 4px; border-radius: 8px; border: 2px dashed #cbd5e1;">
            ${otp}
          </span>
        </div>
        <p style="font-size: 14px; color: #64748b; margin-bottom: 24px; text-align: center;">
          This code will expire in 10 minutes. Please do not share this code with anyone.
        </p>
      </div>
      <div style="background-color: #f8fafc; padding: 24px; text-align: center; color: #64748b; font-size: 14px;">
        &copy; ${new Date().getFullYear()} CareerMinds Inc. All rights reserved.
      </div>
    </div>
  `;

  await sendEmail({
    email: user.email,
    subject: "Verify your CareerMinds Account 🚀",
    html: welcomeHTML,
  });

  res.status(201).json({
    message: "Registration successful. Please check your email for the OTP.",
    email: user.email,
  });
});

// @route   POST /api/auth/verify-otp
export const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Please provide both email and OTP." });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  if (user.isVerified) {
    return res.status(400).json({ message: "User is already verified." });
  }

  // Check if OTP matches and hasn't expired
  if (user.otp !== otp || user.otpExpires < new Date()) {
    return res.status(400).json({ message: "Invalid or expired OTP." });
  }

  // OTP valid, mark as verified and clear OTP fields
  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  // Issue token just like a login
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
});

// @route   POST /api/auth/login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  if (!user.isVerified) {
    // Technically we could resend the OTP here, but keeping it simple for now
    return res.status(403).json({ message: "Please verify your email before logging in." });
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
});

// @route   POST /api/auth/resend-otp
export const resendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Please provide an email." });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  if (user.isVerified) {
    return res.status(400).json({ message: "User is already verified." });
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  // Set expiry to 10 minutes from now
  const otpExpires = new Date(Date.now() + 10 * 60000);

  user.otp = otp;
  user.otpExpires = otpExpires;
  await user.save();

  // Send New OTP Email
  const welcomeHTML = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
      <div style="background-color: #2563eb; padding: 32px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Your New CareerMinds OTP!</h1>
      </div>
      <div style="padding: 32px; background-color: #ffffff;">
        <p style="font-size: 16px; color: #334155; margin-bottom: 24px;">Hi ${user.name},</p>
        <p style="font-size: 16px; color: #334155; margin-bottom: 24px; line-height: 1.6;">
          You requested a new one-time password (OTP) to verify your email address. Here it is:
        </p>
        <div style="text-align: center; margin: 32px 0;">
          <span style="display: inline-block; background-color: #f1f5f9; color: #0f172a; padding: 16px 32px; font-size: 32px; font-weight: bold; letter-spacing: 4px; border-radius: 8px; border: 2px dashed #cbd5e1;">
            ${otp}
          </span>
        </div>
        <p style="font-size: 14px; color: #64748b; margin-bottom: 24px; text-align: center;">
          This code will expire in 10 minutes. Please do not share this code with anyone.
        </p>
      </div>
      <div style="background-color: #f8fafc; padding: 24px; text-align: center; color: #64748b; font-size: 14px;">
        &copy; ${new Date().getFullYear()} CareerMinds Inc. All rights reserved.
      </div>
    </div>
  `;

  await sendEmail({
    email: user.email,
    subject: "Your New OTP for CareerMinds 🚀",
    html: welcomeHTML,
  });

  res.status(200).json({
    message: "A new OTP has been sent to your email.",
  });
});

// @route   POST /api/auth/forgot-password
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Please provide an email." });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  // Generate 6-digit OTP
  const resetPasswordOtp = Math.floor(100000 + Math.random() * 900000).toString();
  // Set expiry to 10 minutes from now
  const resetPasswordExpires = new Date(Date.now() + 10 * 60000);

  user.resetPasswordOtp = resetPasswordOtp;
  user.resetPasswordExpires = resetPasswordExpires;
  await user.save();

  // Send Reset Password Email
  const resetPasswordHTML = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
      <div style="background-color: #ef4444; padding: 32px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Password Reset Request</h1>
      </div>
      <div style="padding: 32px; background-color: #ffffff;">
        <p style="font-size: 16px; color: #334155; margin-bottom: 24px;">Hi ${user.name},</p>
        <p style="font-size: 16px; color: #334155; margin-bottom: 24px; line-height: 1.6;">
          We received a request to reset your password. Use the following one-time password (OTP) to proceed:
        </p>
        <div style="text-align: center; margin: 32px 0;">
          <span style="display: inline-block; background-color: #f1f5f9; color: #0f172a; padding: 16px 32px; font-size: 32px; font-weight: bold; letter-spacing: 4px; border-radius: 8px; border: 2px dashed #cbd5e1;">
            ${resetPasswordOtp}
          </span>
        </div>
        <p style="font-size: 14px; color: #64748b; margin-bottom: 24px; text-align: center;">
          This code will expire in 10 minutes. If you did not request a password reset, please ignore this email.
        </p>
      </div>
      <div style="background-color: #f8fafc; padding: 24px; text-align: center; color: #64748b; font-size: 14px;">
        &copy; ${new Date().getFullYear()} CareerMinds Inc. All rights reserved.
      </div>
    </div>
  `;

  await sendEmail({
    email: user.email,
    subject: "Reset Your CareerMinds Password 🔒",
    html: resetPasswordHTML,
  });

  res.status(200).json({
    message: "A password reset OTP has been sent to your email.",
  });
});

// @route   POST /api/auth/reset-password
export const resetPassword = asyncHandler(async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({ message: "Please provide email, OTP, and new password." });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  // Check if OTP matches and hasn't expired
  if (user.resetPasswordOtp !== otp || user.resetPasswordExpires < new Date()) {
    return res.status(400).json({ message: "Invalid or expired OTP." });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  // OTP valid, update password and clear reset fields
  user.password = hashedPassword;
  user.resetPasswordOtp = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.status(200).json({
    message: "Password reset successfully. You can now log in with your new password.",
  });
});
