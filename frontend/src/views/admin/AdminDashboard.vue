<template>
  <div>
    <AdminNavbar />

    <div class="p-8 max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <!-- STATS -->
      <div class="grid grid-cols-4 gap-6 mb-8">
        <StatCard title="Users" :value="stats.users" />
        <StatCard title="Projects" :value="stats.projects" />
        <StatCard title="Completed" :value="stats.completed" />
        <StatCard title="Ongoing" :value="stats.ongoing" />
      </div>

      <!-- RECENT PROJECTS -->
      <h2 class="text-xl font-semibold mb-3">Recent Projects</h2>

      <div v-for="p in recentProjects" :key="p.id" class="bg-white p-4 rounded-xl mb-3 shadow">
        <p class="font-semibold">{{ p.title }}</p>
        <p class="text-sm text-gray-500">Owner: {{ p.owner_name }}</p>
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
    const stats = ref({
      users: 0,
      projects: 0,
      completed: 0,
      ongoing: 0
    });

    const recentProjects = ref([]);

    onMounted(async () => {
      const usersRes = await api.get("/users");
      const projectsRes = await api.get("/projects");

      const projects = projectsRes.data.projects;

      stats.value.users = usersRes.data.users.length;
      stats.value.projects = projects.length;
      stats.value.completed = projects.filter(p => p.status === "completed").length;
      stats.value.ongoing = projects.filter(p => p.status === "ongoing").length;

      recentProjects.value = projects.slice(0, 3);
    });

    return { stats, recentProjects };
  }
};
</script>
