import { defineStore } from "pinia";
import api from "../api/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
  },

  actions: {
    async login(email, password) {
      const res = await api.post("/auth/login", { email, password });
      const { token, user} = res.data;

      this.token = token;
      this.user = user;
      this.role = user.role;

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("userName", user.name);

      return user;
    },

    logout() {
      localStorage.clear();
      this.user = null;
      this.token = null;
      this.role = null;
    }
  }
});
