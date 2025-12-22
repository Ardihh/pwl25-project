<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />

    <div class="container mx-auto px-4 py-12 max-w-2xl">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-3xl font-extrabold text-gray-900">Create New Project</h2>
        <router-link 
          to="/projects" 
          class="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          &larr; Cancel & Go Back
        </router-link>
      </div>

      <form @submit.prevent="save" class="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 space-y-6">
        
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Project Title</label>
          <input 
            v-model="title" 
            placeholder="e.g. Website Development" 
            required
            maxlength="150"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
          />
        </div>

        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Description</label>
          <textarea 
            v-model="description" 
            placeholder="Provide a brief overview of the project..."
            rows="4"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
          ></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Budget (Rp)</label>
            <div class="relative">
              <span class="absolute left-4 top-3 text-gray-400 text-sm">Rp</span>
              <input 
                v-model="budget" 
                type="number" 
                placeholder="0.00" 
                required
                class="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Deadline</label>
            <input 
              v-model="deadline" 
              type="date" 
              required
              class="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Project Status</label>
          <select 
            v-model="status" 
            class="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
          >
            <option value="planning">Planning</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="on_hold">On Hold</option>
          </select>
        </div>

        <button 
          type="submit"
          class="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition-all transform hover:scale-[1.01] active:scale-95 shadow-lg"
        >
          🚀 Create Project
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import api from "../api/axios";
import { useRouter } from "vue-router";
import Navbar from "../components/Navbar.vue";

export default {
  components: { Navbar },
  setup() {
    const router = useRouter();

    const title = ref("");
    const description = ref("");
    const budget = ref(0);
    const deadline = ref("");
    const status = ref("planning"); 

    const save = async () => {
      try {
        await api.post("/projects", {
          title: title.value,
          description: description.value,
          budget: budget.value,
          deadline: deadline.value,
          status: status.value
        });
        
        router.push("/projects");
      } catch (error) {
        console.error("Gagal simpan proyek:", error);
        alert("Gagal menyimpan proyek. Periksa koneksi backend Anda.");
      }
    };

    return { title, description, budget, deadline, status, save };
  },
};
</script>