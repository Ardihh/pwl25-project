<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />

    <div class="container mx-auto px-4 py-12 max-w-2xl">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-3xl font-extrabold text-gray-900">Create New Task</h2>
        <router-link 
          :to="`/projects/${$route.params.id}`" 
          class="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          &larr; Back to Project
        </router-link>
      </div>

      <form @submit.prevent="save" class="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 space-y-6">
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Task Title</label>
          <input 
            v-model="title" 
            placeholder="e.g. Design Landing Page" 
            required
            maxlength="150"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Task Details</label>
          <span class="text-xs text-gray-400 block mb-2">(Describe what needs to be done)</span>
          <textarea 
            v-model="detail" 
            placeholder="Enter detailed description..."
            rows="4"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          ></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Priority Level</label>
            <select 
              v-model="priority" 
              class="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option :value="1">1 - Very Low</option>
              <option :value="2">2 - Low</option>
              <option :value="3">3 - Medium</option>
              <option :value="4">4 - High</option>
              <option :value="5">5 - Urgent</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Due Date</label>
            <input 
              type="date" 
              v-model="due_date" 
              class="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Initial Status</label>
          <select 
            v-model="status" 
            class="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <button 
          type="submit"
          class="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition-all transform hover:scale-[1.01] active:scale-95 shadow-lg"
        >
          Save Task to Project
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import api from "../api/axios";
import { useRoute, useRouter } from "vue-router";
import Navbar from "../components/Navbar.vue";

export default {
  components: { Navbar },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const projectId = route.params.id;

    const title = ref("");
    const detail = ref("");
    const priority = ref(3);
    const due_date = ref("");
    const status = ref("todo");

    const save = async () => {
      try {
        await api.post(`/tasks/project/${projectId}`, {
          project_id: projectId, 
          title: title.value,
          detail: detail.value,
          priority: priority.value,
          due_date: due_date.value,
          status: status.value
        });
        
        router.push(`/projects/${projectId}`);
      } catch (error) {
        console.error("Gagal menyimpan task:", error);
        alert("Terjadi kesalahan saat menyimpan data.");
      }
    };

    return { title, detail, priority, due_date, status, save };
  },
};
</script>