<template>
  <nav class="flex justify-between items-center px-6 py-3.5 bg-slate-900 text-gray-100 border-b border-white/10 backdrop-blur-sm">
    <h2 class="text-xl font-bold tracking-wide cursor-pointer" @click="go('/')">Project Manager</h2>

    <div class="flex items-center gap-3">
      <!-- Jika belum login -->
      <button 
        v-if="!auth.isLoggedIn" 
        @click="go('/login')" 
        class="px-3.5 py-2 rounded-lg border border-white/10 bg-white/5 text-gray-100 hover:bg-cyan-500/20 hover:border-cyan-400/40 hover:text-white hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-lg hover:shadow-cyan-500/25"
      >
        Login
      </button>
      <button 
        v-if="!auth.isLoggedIn" 
        @click="go('/register')" 
        class="px-3.5 py-2 rounded-lg border border-white/10 bg-white/5 text-gray-100 hover:bg-cyan-500/20 hover:border-cyan-400/40 hover:text-white hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-lg hover:shadow-cyan-500/25"
      >
        Register
      </button>

      <!-- Jika sudah login -->
      <button 
        v-if="auth.isLoggedIn" 
        @click="go('/')" 
        class="px-3.5 py-2 rounded-lg border border-white/10 bg-white/5 text-gray-100 hover:bg-cyan-500/20 hover:border-cyan-400/40 hover:text-white hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-lg hover:shadow-cyan-500/25"
      >
        Dashboard
      </button>
      <button 
        v-if="auth.isLoggedIn" 
        @click="go('/projects')" 
        class="px-3.5 py-2 rounded-lg border border-white/10 bg-white/5 text-gray-100 hover:bg-cyan-500/20 hover:border-cyan-400/40 hover:text-white hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-lg hover:shadow-cyan-500/25"
      >
        Projects
      </button>
      <button 
        v-if="auth.isLoggedIn" 
        @click="logout" 
        class="px-3.5 py-2 rounded-lg border border-red-400/30 bg-red-500/15 text-red-200 hover:bg-red-500/20 hover:border-red-400/50 hover:text-white hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-lg hover:shadow-red-500/30"
      >
        Logout
      </button>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

export default {
  setup() {
    const auth = useAuthStore();
    const router = useRouter(); 

    function go(path) {
      router.push(path); 
    }

    function logout() {
      auth.logout();
      router.push("/login");
    }

    return { auth, go, logout };
  },
};
</script>