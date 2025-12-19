<template>
  <div class="min-h-screen bg-gray-50">
    <AdminNavbar />
    <div class="p-8 max-w-7xl mx-auto">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Global Projects</h1>
        <p class="text-gray-500 mt-1">Monitoring seluruh proyek yang berjalan di platform.</p>
      </div>

      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50/50 border-b border-gray-100">
              <th class="px-6 py-4 text-sm font-bold text-gray-700">Project Name</th>
              <th class="px-6 py-4 text-sm font-bold text-gray-700">Owner</th>
              <th class="px-6 py-4 text-sm font-bold text-gray-700">Status</th>
              <th class="px-6 py-4 text-sm font-bold text-gray-700">Budget</th>
              <th class="px-6 py-4 text-sm font-bold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="project in projects" :key="project.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4">
                <div class="font-bold text-gray-900">{{ project.title }}</div>
                <div class="text-xs text-gray-400">ID: #{{ project.id }}</div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ project.owner_name }}</td>
              <td class="px-6 py-4">
                <span :class="getStatusClass(project.status)"
                      class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {{ project.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm font-mono text-blue-600">
                Rp {{ Number(project.budget || 0).toLocaleString() }}
              </td>
              <td class="px-6 py-4">
                <button @click="$router.push(`/admin/projects/${project.id}`)"
                        class="text-blue-600 hover:text-blue-800 font-bold text-sm">
                  View Detail →
                </button>
              </td>
            </tr>
          </tbody>
        </table>
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
    const projects = ref([]);

    const fetchProjects = async () => {
      const res = await api.get("/admin/projects");
      projects.value = res.data.projects;
    };

    const getStatusClass = (status) => {
      const classes = {
        planning: "bg-yellow-100 text-yellow-700",
        ongoing: "bg-blue-100 text-blue-700",
        completed: "bg-green-100 text-green-700",
        on_hold: "bg-red-100 text-red-700"
      };
      return classes[status] || "bg-gray-100 text-gray-700";
    };

  onMounted(async () => {
    try {
      const res = await api.get("/admin/projects");
      projects.value = res.data.projects.map(p => ({
        ...p,
        budget: Number(p.budget) 
      }));
    } catch (err) {
      console.error("Gagal ambil data proyek");
    }
  });
    return { projects, getStatusClass };
  }
};
</script>