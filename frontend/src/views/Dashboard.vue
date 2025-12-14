<template>
  <div>
    <!-- NAVBAR -->
    <nav class="flex justify-between items-center px-6 py-3.5 bg-slate-900 text-gray-100 border-b border-white/10">
      <h2 class="text-xl font-bold cursor-pointer" @click="$router.push('/')">Project Manager</h2>

      <div class="flex items-center gap-3">
        <button 
          class="px-3.5 py-2 rounded-lg border border-white/10 bg-white/5 text-gray-100 hover:bg-cyan-500/20 hover:border-cyan-400/40 hover:text-white hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-lg hover:shadow-cyan-500/25"
          @click="$router.push('/projects')"
        >
          Projects
        </button>
        <button 
          class="px-3.5 py-2 rounded-lg border border-white/10 bg-white/5 text-gray-100 hover:bg-cyan-500/20 hover:border-cyan-400/40 hover:text-white hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-lg hover:shadow-cyan-500/25"
          @click="$router.push('/projects/new')"
        >
          + Add Project
        </button>
        <button 
          class="px-3.5 py-2 rounded-lg border border-red-400/30 bg-red-500/15 text-red-200 hover:bg-red-500/20 hover:border-red-400/50 hover:text-white hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-lg hover:shadow-red-500/30"
          @click="logout"
        >
          Logout
        </button>
      </div>
    </nav>

    <!-- PAGE CONTENT -->
    <div class="container mx-auto px-8 py-8 max-w-5xl">
      <!-- HEADER -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-2">Dashboard</h1>
        <p class="text-gray-600">Welcome back, {{ userName }} 👋</p>

        <!-- ADD PROJECT BUTTON (for mobile) -->
        <button 
          class="mt-4 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 active:from-cyan-700 active:to-cyan-800 text-slate-900 font-bold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl active:shadow-md hidden md:hidden"
          @click="$router.push('/projects/new')"
        >
          + Create New Project
        </button>
      </div>

      <!-- CARDS -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <div class="bg-white p-5 rounded-2xl shadow-lg text-center border border-gray-100">
          <h2 class="text-lg mb-2 text-gray-600">Total Projects</h2>
          <p class="text-4xl font-bold text-cyan-500">{{ stats.projects }}</p>
        </div>

        <div class="bg-white p-5 rounded-2xl shadow-lg text-center border border-gray-100">
          <h2 class="text-lg mb-2 text-gray-600">Total Tasks</h2>
          <p class="text-4xl font-bold text-cyan-500">{{ stats.tasks }}</p>
        </div>

        <div class="bg-white p-5 rounded-2xl shadow-lg text-center border border-gray-100">
          <h2 class="text-lg mb-2 text-gray-600">Completed</h2>
          <p class="text-4xl font-bold text-cyan-500">{{ stats.completed }}</p>
        </div>

        <div class="bg-white p-5 rounded-2xl shadow-lg text-center border border-gray-100">
          <h2 class="text-lg mb-2 text-gray-600">Pending</h2>
          <p class="text-4xl font-bold text-cyan-500">{{ stats.pending }}</p>
        </div>
      </div>

      <!-- RECENT PROJECTS -->
      <div class="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <h2 class="text-2xl font-bold mb-4">Recent Projects</h2>

        <div v-if="projects.length === 0" class="bg-gray-50 p-5 rounded-xl text-center text-gray-600 border border-dashed border-gray-300">
          Belum ada project, yuk buat project pertama kamu! 🚀
          <br />
            <button 
            class="mt-3 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 active:from-cyan-700 active:to-cyan-800 text-white font-bold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl active:shadow-md"
            @click="$router.push('/projects/new')"
            >
            + Tambah Project
          </button>
        </div>

        <div v-else class="space-y-3">
          <div 
            v-for="p in projects.slice(0, 5)"
            :key="p.id"
            class="bg-gray-50 p-5 rounded-xl shadow-sm hover:shadow-md hover:translate-x-1 cursor-pointer transition-all duration-200 flex justify-between items-center border border-gray-200 hover:border-cyan-400/50 hover:bg-cyan-50/50"
            @click="$router.push('/projects/' + p.id)"
          >
            <div class="flex-1">
              <h3 class="text-lg font-semibold mb-1 text-gray-800">{{ p.title || p.name }}</h3>
              <p class="text-sm text-gray-500 mt-1">{{ p.description || 'No description' }}</p>
            </div>
            <span class="text-2xl text-cyan-500">›</span>
          </div>
        </div>

        <!-- Add Task Button -->
        <div v-if="projects.length > 0" class="mt-6 text-center">
          <button 
            class="px-5 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 active:from-green-700 active:to-green-800 text-white font-bold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl active:shadow-md"
            @click="goToTaskCreate"
          >
            + Add New Task
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import api from "../api/axios";
import { useAuthStore } from "../stores/auth";

export default {
  setup() {
    const stats = ref({
      projects: 0,
      tasks: 0,
      completed: 0,
      pending: 0
    });

    const projects = ref([]);
    const userName = ref("User");

    const auth = useAuthStore();

    const logout = () => {
      auth.logout();
      window.location.href = "/login";
    };

    const goToTaskCreate = () => {
      if (projects.value.length > 0) {
        const firstProject = projects.value[0].id;
        return window.location.href = `/projects/${firstProject}/tasks/new`;
      }
    };

    const getUserIdFromToken = () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return null;
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.id;
      } catch (err) {
        return null;
      }
    };

    onMounted(async () => {
      try {
        const userId = getUserIdFromToken();
        if (userId) {
          const userRes = await api.get(`/users/${userId}`);
          if (userRes.data && userRes.data.user) {
            userName.value = userRes.data.user.name || "User";
          }
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }

      try {
        const resProjects = await api.get("/projects");
        projects.value = resProjects.data.projects || resProjects.data || [];

        stats.value.projects = projects.value.length;

        const tasksArrays = await Promise.all(
          projects.value.map(async (p) => {
            try {
              if (Array.isArray(p.tasks)) {
                return p.tasks;
              }

              const projectId = p.id || p._id;
              if (!projectId) return [];

              const endpoints = [
                `/tasks/project/${projectId}`,
                `/projects/${projectId}/tasks`
              ];

              for (const ep of endpoints) {
                try {
                  const r = await api.get(ep);
                  const data = r && r.data ? r.data : [];
                  const tasks = Array.isArray(data)
                    ? data
                    : Array.isArray(data.tasks)
                    ? data.tasks
                    : [];
                  return tasks;
                } catch (e) {
                  // try next endpoint
                }
              }

              return [];
            } catch (e) {
              console.error(`Failed to fetch tasks for project ${p.id || p._id}:`, e);
              return [];
            }
          })
        );

        const allTasks = tasksArrays.flat();

        stats.value.tasks = allTasks.length;

        const isTaskCompleted = (task) => {
          if (!task) return false;
          if (typeof task.completed === "boolean") return task.completed === true;
          if (task.status) {
            const s = String(task.status).toLowerCase();
            return s === "completed" || s === "done";
          }
          if (typeof task === "string") {
            const s = task.toLowerCase();
            return s === "completed" || s === "done";
          }
          return false;
        };

        const completedCount = allTasks.filter(isTaskCompleted).length;
        stats.value.completed = completedCount;
        stats.value.pending = Math.max(0, stats.value.tasks - completedCount);
      } catch (err) {
        console.error("Failed to fetch projects or tasks:", err);
      }
    });

    return { stats, projects, userName, logout, goToTaskCreate };
  }
};
</script>