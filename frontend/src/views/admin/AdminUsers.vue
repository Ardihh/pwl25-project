<template>
  <div class="min-h-screen bg-gray-50">
    <AdminNavbar />
    <div class="p-8 max-w-7xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">User Management</h1>
          <p class="text-gray-500 mt-1">Kelola akses dan peran pengguna sistem.</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="user in users" :key="user.id" 
             class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div class="flex items-start justify-between mb-4">
            <div class="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
              {{ user.name.charAt(0) }}
            </div>
            <span :class="user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'"
                  class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {{ user.role }}
            </span>
          </div>
          
          <h3 class="text-lg font-bold text-gray-900">{{ user.name }}</h3>
          <p class="text-gray-500 text-sm mb-4">{{ user.email }}</p>
          
          <div class="flex gap-2 pt-4 border-t border-gray-50">
            <button @click="changeRole(user.id, user.role)" 
                    class="flex-1 px-4 py-2 text-sm font-semibold bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100">
              Ubah Role
            </button>
            <button @click="deleteUser(user.id)" 
                    class="px-4 py-2 text-sm font-semibold bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
              Hapus
            </button>
          </div>
        </div>
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
    const users = ref([]);

    const fetchUsers = async () => {
      const res = await api.get("/admin/users");
      users.value = res.data.users;
    };

    const changeRole = async (userId, currentRole) => {
      const newRole = currentRole === 'admin' ? 'user' : 'admin'; 

      const konfirmasi = confirm(`Ubah role user ini menjadi ${newRole.toUpperCase()}?`);

      if (konfirmasi) {
        try {
          await api.put(`/admin/users/${userId}/role`, { role: newRole });
          alert("Role berhasil diperbarui!");
          fetchUsers(); 
        } catch (err) {
          alert("Gagal mengubah role: " + (err.response?.data?.message || err.message));
        }
      }
    };
    
    const deleteUser = async (id) => {
      if (confirm("Yakin hapus user ini?")) {
        await api.delete(`/admin/users/${id}`);
        fetchUsers();
      }
    };

    onMounted(fetchUsers);
    return { users, deleteUser, changeRole };
  }
};
</script>