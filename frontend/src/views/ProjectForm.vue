<template>
  <div>
    <Navbar />

    <div class="container mx-auto px-8 py-8 max-w-2xl">
      <h2 class="text-3xl font-bold mb-6">Create Project</h2>

      <form @submit.prevent="save" class="bg-white p-6 rounded-xl shadow-lg border border-gray-100 space-y-4">
        <input 
          v-model="title" 
          placeholder="Title" 
          required
          class="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        />
        <input 
          v-model="budget" 
          type="number" 
          placeholder="Budget" 
          required
          class="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        />
        <input 
          v-model="deadline" 
          type="date" 
          required
          class="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        />
        <textarea 
          v-model="description" 
          placeholder="Description"
          rows="4"
          class="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        ></textarea>

        <button 
          type="submit"
          class="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-base transition-all duration-200 shadow-md hover:shadow-lg active:shadow-md"
        >
          Save
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import api from "../api/axios";
import Navbar from "../components/Navbar.vue";

export default {
  components: {
    Navbar
  },
  setup() {
    const title = ref("");
    const budget = ref(0);
    const deadline = ref("");
    const description = ref("");

    const save = async () => {
      await api.post("/projects", {
        title: title.value,
        budget: budget.value,
        deadline: deadline.value,
        description: description.value,
      });
      window.location.href = "/projects";
    };

    return { title, budget, deadline, description, save };
  },
};
</script>