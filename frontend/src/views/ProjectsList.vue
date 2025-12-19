<template>
  <div>
    <Navbar />

    <div class="container mx-auto px-8 py-8 max-w-6xl">
      <h1 class="text-3xl font-bold mb-6">Your Projects</h1>
      
      <div class="mb-6">
        <button 
          @click="$router.push('/projects/new')" 
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          + Add Project
        </button>
      </div>

      <!-- No projects -->
      <div v-if="projects.length === 0" class="bg-gray-100 p-5 rounded-lg text-center text-gray-600">
        Belum ada project. Yuk buat yang pertama! 🚀
      </div>

      <!-- Project List -->
      <div v-else class="space-y-3">
        <div 
          v-for="p in projects" 
          :key="p.id" 
          class="bg-white p-5 rounded-xl shadow-sm hover:shadow-md hover:translate-x-1 cursor-pointer transition-all duration-200 flex justify-between items-center border border-gray-100"
          @click="$router.push('/projects/' + p.id)"
        >
          <div class="flex-1">
            <div class="flex justify-between items-center mb-1">
              <h2 class="text-xl font-semibold">{{ p.title }}</h2>
              <span class="text-sm text-gray-500 font-medium">{{ p.deadline }}</span>
            </div>
            <p class="text-sm text-gray-500">{{ p.description }}</p>
            <div class="flex justify-between items-center mt-2">
                <span class="text-sm px-3 py-1 rounded-full font-medium" :class="getStatusClass(p.status)">
                {{ p.status }}
                </span>
            </div>
          </div>
          <span class="text-2xl text-blue-600 ml-4">›</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import api from "../api/axios";
import Navbar from "../components/Navbar.vue";

export default {
  components: {
    Navbar
  },
  setup() {
    const projects = ref([]);

    // ambil role dari localStorage
    const role = localStorage.getItem("role");

    // computed biar reactive & rapi
    const isAdmin = computed(() => role === "admin");

    // status badge
    const getStatusClass = (status) => {
      const statusClasses = {
        ongoing: "bg-blue-100 text-blue-800",
        planning: "bg-yellow-100 text-yellow-800",
        completed: "bg-green-100 text-green-800",
        on_hold: "bg-red-100 text-red-800"
      };
      return statusClasses[status] || "bg-gray-100 text-gray-800";
    };

    const loadProjects = async () => {
      try {
        const res = await api.get("/projects");
        console.log(res.data.projects);
        projects.value = res.data.projects || [];
      } catch (err) {
        console.error("Gagal ambil project:", err);
        projects.value = [];
      }
    };

    onMounted(() => {
      loadProjects();
    });

    return {
      projects,
      isAdmin,
      getStatusClass
    };
  }
};
</script>
