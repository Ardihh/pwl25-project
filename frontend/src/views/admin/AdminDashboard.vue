<template>
  <div class="min-h-screen bg-gray-50">
    <AdminNavbar />

    <div class="p-8 max-w-7xl mx-auto">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p class="text-gray-500 mt-1">Ikhtisar performa sistem dan data statistik.</p>
      </div>

      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
        {{ error }}
      </div>

      <div v-else-if="stats" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div class="p-4 bg-blue-100 text-blue-600 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div>
            <p class="text-sm text-gray-500 font-semibold uppercase tracking-wider">Total Users</p>
            <h3 class="text-3xl font-black text-gray-900">{{ stats.totalUsers }}</h3>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div class="p-4 bg-green-100 text-green-600 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <p class="text-sm text-gray-500 font-semibold uppercase tracking-wider">Total Projects</p>
            <h3 class="text-3xl font-black text-gray-900">{{ stats.totalProjects }}</h3>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div class="p-4 bg-purple-100 text-purple-600 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div>
            <p class="text-sm text-gray-500 font-semibold uppercase tracking-wider">Total Tasks</p>
            <h3 class="text-3xl font-black text-gray-900">{{ stats.totalTasks }}</h3>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div class="p-4 bg-yellow-100 text-yellow-600 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p class="text-sm text-gray-500 font-semibold uppercase tracking-wider">Estimated Budget</p>
            <h3 class="text-xl font-black text-gray-900 leading-none">Rp {{ Number(stats.totalBudget || 0).toLocaleString() }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import api from "../../api/axios";
import AdminNavbar from "../../components/AdminNavbar.vue";

export default {
  components: { AdminNavbar },
  setup() {
    const stats = ref(null);
    const loading = ref(true);
    const error = ref(null);

    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/stats");
        stats.value = res.data;
      } catch (err) {
        error.value = "Gagal memuat statistik. Pastikan server aktif.";
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchStats);

    return { stats, loading, error };
  }
};
</script>