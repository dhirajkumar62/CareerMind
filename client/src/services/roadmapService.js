import API from "./api";

export const getUserRoadmap = async () => {
  const response = await API.get("/dashboard");
  return response.data.roadmap;
};

export const toggleMilestone = async (milestoneId) => {
  const response = await API.put(`/dashboard/milestone/${milestoneId}`);
  return response.data;
};