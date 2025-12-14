<template>
  <div>
    <Navbar />

    <div class="container mx-auto px-8 py-8 max-w-2xl">
      <h2 class="text-3xl font-bold mb-6">Create Task</h2>

      <form @submit.prevent="save" class="bg-white p-6 rounded-xl shadow-lg border border-gray-100 space-y-4">
        <input 
          v-model="title" 
          placeholder="Title" 
          required
          class="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        />
        <textarea 
          v-model="detail" 
          placeholder="Detail"
          rows="4"
          class="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        ></textarea>

        <div>
          <label class="block text-sm font-semibold mb-2 text-gray-700">Priority (1–5):</label>
          <input 
            type="number" 
            v-model="priority" 
            min="1" 
            max="5" 
            required
            class="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold mb-2 text-gray-700">Due Date:</label>
          <input 
            type="date" 
            v-model="due_date" 
            required
            class="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>

        <button 
          type="submit"
          class="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-base transition-all duration-200 shadow-md hover:shadow-lg active:shadow-md"
        >
          Save Task
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import api from "../api/axios";
import { useRoute } from "vue-router";
import Navbar from "../components/Navbar.vue";

export default {
  components: {
    Navbar
  },
  setup() {
    const route = useRoute();
    const projectId = route.params.id;

    const title = ref("");
    const detail = ref("");
    const priority = ref(3);
    const due_date = ref("");

    const save = async () => {
      await api.post(`/tasks/project/${projectId}`, {
        title: title.value,
        detail: detail.value,
        priority: priority.value,
        due_date: due_date.value,
      });

      window.location.href = `/projects/${projectId}`;
    };

    return { title, detail, priority, due_date, save };
  },
};
</script>