import API from "./api";

const portfolioService = {
    getPortfolio: async () => {
        const response = await API.get("/portfolio");
        return response.data;
    },
    updatePortfolio: async (data) => {
        const response = await API.put("/portfolio", data);
        return response.data;
    },
};

export default portfolioService;
