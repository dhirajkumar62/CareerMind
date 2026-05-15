import API from "./api";

export const registerUser = async (formData) => {
  const response = await API.post("/auth/register", formData);
  return response.data;
};

export const verifyOtp = async (data) => {
  const response = await API.post("/auth/verify-otp", data);
  return response.data;
};

export const resendOtp = async (data) => {
  const response = await API.post("/auth/resend-otp", data);
  return response.data;
};

export const loginUser = async (formData) => {
  const response = await API.post("/auth/login", formData);
  return response.data;
};

export const forgotPassword = async (data) => {
  const response = await API.post("/auth/forgot-password", data);
  return response.data;
};

export const resetPassword = async (data) => {
  const response = await API.post("/auth/reset-password", data);
  return response.data;
};