import API from "./api";

export const fetchCareers = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString();
  const response = await API.get(`/careers?${query}`);
  return response.data;
};

export const fetchCareerDetails = async (careerId) => {
  const response = await API.get(`/careers/${careerId}`);
  return response.data;
};

export const generateCustomCareers = async (prompt) => {
  const response = await API.post("/careers/custom", { prompt });
  return response.data;
};