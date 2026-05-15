import API from "./api";

export const getDashboardData = async () => {
  const response = await API.get("/dashboard");
  return response.data;
};

export const toggleMilestone = async (milestoneId) => {
  const response = await API.put(`/dashboard/milestone/${milestoneId}`);
  return response.data;
};