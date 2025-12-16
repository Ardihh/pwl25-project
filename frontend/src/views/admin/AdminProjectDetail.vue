<template>
  <div>
    <AdminNavbar />

    <div class="max-w-4xl mx-auto px-6 py-8">
      <button
        @click="$router.back()"
        class="mb-4 text-blue-600 hover:underline"
      >
        ← Back
      </button>

      <div v-if="loading" class="text-gray-500">
        Loading project detail...
      </div>

      <div v-else-if="!project" class="text-red-500">
        Project tidak ditemukan
      </div>

      <div v-else class="bg-white rounded-xl shadow p-6 space-y-4">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold">{{ project.title }}</h1>
          <span
            class="px-3 py-1 rounded-full text-sm font-semibold"
            :class="getStatusClass(project.status)"
          >
            {{ project.status }}
          </span>
        </div>

        <p class="text-gray-600">{{ project.description }}</p>

        <div class="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <p><strong>Owner:</strong> {{ project.owner_name }}</p>
          <p><strong>Deadline:</strong> {{ project.deadline }}</p>
          <p><strong>Created:</strong> {{ project.created_at }}</p>
          <p><strong>Updated:</strong> {{ project.updated_at }}</p>
        </div>

        <div class="flex gap-3 pt-4">
          <button
            @click="editProject"
            class="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
          >
            ✏ Edit
          </button>

          <button
            @click="deleteProject"
            class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
          >
            🗑 Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "../../api/axios";
import AdminNavbar from "../../components/AdminNavbar.vue";

export default {
  components: { AdminNavbar },

  setup() {
    const route = useRoute();
    const router = useRouter();

    const project = ref(null);
    const loading = ref(true);

    const getStatusClass = (status) => {
      return {
        planning: "bg-yellow-100 text-yellow-800",
        ongoing: "bg-blue-100 text-blue-800",
        completed: "bg-green-100 text-green-800",
        on_hold: "bg-red-100 text-red-800",
      }[status] || "bg-gray-100 text-gray-800";
    };

    const loadProject = async () => {
      try {
        const res = await api.get(`/projects/${route.params.id}`);
        project.value = res.data.project;
      } catch (err) {
        console.error("Gagal ambil detail project", err);
      } finally {
        loading.value = false;
      }
    };

    const editProject = () => {
      router.push(`/projects/${project.value.id}/edit`);
    };

    const deleteProject = async () => {
      if (!confirm("Yakin ingin menghapus project ini?")) return;

      try {
        await api.delete(`/projects/${project.value.id}`);
        alert("Project berhasil dihapus");
        router.push("/admin/projects");
      } catch (err) {
        alert("Gagal menghapus project");
      }
    };

    onMounted(loadProject);

    return {
      project,
      loading,
      getStatusClass,
      editProject,
      deleteProject,
    };
  },
};
</script>
