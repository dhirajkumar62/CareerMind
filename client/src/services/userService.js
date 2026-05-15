import API from "./api";

export const updateProfile = async (userData) => {
    const response = await API.put("/users/profile", userData);
    return response.data;
};

export const changePassword = async (passwordData) => {
    const response = await API.put("/users/change-password", passwordData);
    return response.data;
};

export const completeProfile = async (profileData) => {
    const response = await API.put("/users/complete-profile", profileData);
    return response.data;
};
