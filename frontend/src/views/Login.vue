<template>
  <div class="flex justify-center items-center min-h-[88vh] bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg text-center">
      <h2 class="text-2xl font-bold mb-5">Login</h2>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <input 
          v-model="email" 
          placeholder="Email" 
          type="email"
          class="w-full px-3 py-3 rounded-lg border border-gray-300 text-sm bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        />
        <input 
          v-model="password" 
          placeholder="Password" 
          type="password"
          class="w-full px-3 py-3 rounded-lg border border-gray-300 text-sm bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        />

        <button 
          type="submit"
          class="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-base transition-all duration-200 shadow-md hover:shadow-lg active:shadow-md"
        >
          Login
        </button>
      </form>

      <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>

      <p class="mt-4 text-sm text-gray-600">
        Don't have an account?
        <span @click="$router.push('/register')" class="text-blue-600 cursor-pointer font-semibold hover:underline">
          Register
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const error = ref("");
    const loading = ref(false);

    const auth = useAuthStore();
    const router = useRouter();

    const handleLogin = async () => {
      error.value = "";
      loading.value = true;

      try {
        const user = await auth.login(email.value, password.value);
        if (user && user.role === "admin") {
          await router.push("/admin/dashboard");
        } else {
          await router.push("/dashboard");
        }
        if (role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/");
        }
      } catch (err) {
        error.value = err.response?.data?.message || "Login gagal, periksa email/password";
      } finally {
        loading.value = false;
      }
    };

    return { email, password, error, loading, handleLogin };
  },
};
</script>