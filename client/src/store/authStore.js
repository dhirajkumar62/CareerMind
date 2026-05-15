import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,

  setAuth: (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user || data)); // Handle varied response structures
    set({ user: data.user || data, token: data.token });
  },

  setUser: (userData) => set((state) => {
    const newUser = { ...state.user, ...userData };
    localStorage.setItem("user", JSON.stringify(newUser));
    return { user: newUser };
  }),

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null, token: null });
  },
}));

export default useAuthStore;