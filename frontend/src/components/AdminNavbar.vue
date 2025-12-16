<template>
  <nav class="bg-gray-900 text-white shadow-md">
    <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      
      <!-- Left -->
      <div class="flex items-center space-x-8">
        <h1 class="text-xl font-bold tracking-wide">
          🛠 Admin Panel
        </h1>

        <router-link
          to="/admin/dashboard"
          class="nav-link"
          active-class="active-link"
        >
          Dashboard
        </router-link>

        <router-link
          to="/admin/projects"
          class="nav-link"
          active-class="active-link"
        >
          Projects
        </router-link>

        <router-link
          to="/admin/users"
          class="nav-link"
          active-class="active-link"
        >
          Users
        </router-link>
      </div>

      <!-- Right -->
      <div class="flex items-center space-x-4">
        <span class="text-sm text-gray-300">
          {{ adminName }}
        </span>

        <button
          @click="logout"
          class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-semibold transition"
        >
          Logout
        </button>
      </div>

    </div>
  </nav>
</template>

<script>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

export default {
  setup() {
    const router = useRouter();
    const auth = useAuthStore();

    const adminName = computed(() => {
      return localStorage.getItem("userName") || "Admin";
    });

    const logout = () => {
      auth.logout();
      router.push("/login");
    };

    return {
      adminName,
      logout
    };
  }
};
</script>

<style scoped>
.nav-link {
  font-size: 0.95rem;
  color: #d1d5db;
  font-weight: 500;
  padding-bottom: 4px;
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: white;
}

.active-link {
  color: white;
  border-bottom: 2px solid #3b82f6;
}
</style>
