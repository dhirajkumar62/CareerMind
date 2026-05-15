import API from "./api";

export const sendMessageToAI = async (message) => {
  const response = await API.post("/chat", { message });
  return response.data;
};