import { defineStore } from "pinia";
import api from "../api/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null,
  }),

  actions: {
    async login(email, password) {
      const res = await api.post("/auth/login", { email, password });

      // ⬇⬇⬇ INI YANG SEBELUMNYA KAMU KELEWAT
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("userName", res.data.user.name);

      this.token = res.data.token;
      this.user = res.data.user;
    },

    logout() {
      localStorage.clear();
      this.user = null;
      this.token = null;
    }
  }
});
