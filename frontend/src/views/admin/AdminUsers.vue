<template>
  <div>
    <AdminNavbar />

    <div class="p-8 max-w-5xl mx-auto">
      <h1 class="text-2xl font-bold mb-6">Users</h1>

      <table class="w-full bg-white rounded-xl shadow">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-3 text-left">Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in users" :key="u.id" class="border-t">
            <td class="p-3">{{ u.name }}</td>
            <td>{{ u.email }}</td>
            <td class="font-semibold">{{ u.role }}</td>
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
    const users = ref([]);

    onMounted(async () => {
      const res = await api.get("/users");
      users.value = res.data.users;
    });

    return { users };
  }
};
</script>
