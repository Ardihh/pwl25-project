<template>
  <div>
    <AdminNavbar />

    <div class="p-8 max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold mb-6">All Projects</h1>

      <table class="w-full border rounded-xl overflow-hidden">
        <thead class="bg-gray-100 text-left">
          <tr>
            <th class="p-3">Title</th>
            <th class="p-3">Owner</th>
            <th class="p-3">Status</th>
            <th class="p-3">Deadline</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="p in projects"
            :key="p.id"
            class="border-t hover:bg-gray-50 cursor-pointer"
            @click="$router.push('/admin/projects/' + p.id)"
          >
            <td class="p-3 font-medium">{{ p.title }}</td>
            <td class="p-3 text-gray-600">{{ p.owner_name }}</td>
            <td class="p-3">
              <span :class="getStatusClass(p.status)" class="px-3 py-1 rounded-full text-sm">
                {{ p.status }}
              </span>
            </td>
            <td class="p-3 text-sm text-gray-500">{{ p.deadline }}</td>
          </tr>
        </tbody>
      </table>
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

    const getStatusClass = (status) => ({
      planning: "bg-yellow-100 text-yellow-800",
      ongoing: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      on_hold: "bg-red-100 text-red-800"
    }[status]);

    onMounted(async () => {
      const res = await api.get("/projects");
      projects.value = res.data.projects;
    });

    return { projects, getStatusClass };
  }
};
</script>
