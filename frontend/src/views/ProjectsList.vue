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
          </div>
          <span class="text-2xl text-blue-600 ml-4">›</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import api from "../api/axios";
import Navbar from "../components/Navbar.vue";

export default {
  components: {
    Navbar
  },
  setup() {
    const projects = ref([]);

    onMounted(async () => {
      const res = await api.get("/projects");
      projects.value = res.data.projects;
    });

    return { projects };
  },
};
</script>