import API from "./api";

const resumeService = {
    getResume: async () => {
        const response = await API.get("/resume");
        return response.data;
    },
    generateResume: async () => {
        const response = await API.post("/resume/generate");
        return response.data;
    },
};

export default resumeService;
