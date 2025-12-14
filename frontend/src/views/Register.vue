<template>
  <div class="flex justify-center items-center min-h-[88vh] bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg text-center">
      <h2 class="text-2xl font-bold mb-5">Create Account</h2>

      <form @submit.prevent="doRegister" class="space-y-4">
        <input 
          v-model="name" 
          type="text" 
          placeholder="Name" 
          required
          class="w-full px-3 py-3 rounded-lg border border-gray-300 text-sm bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        />
        <input 
          v-model="email" 
          type="email" 
          placeholder="Email" 
          required
          class="w-full px-3 py-3 rounded-lg border border-gray-300 text-sm bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        />
        <input 
          v-model="password" 
          type="password" 
          placeholder="Password" 
          required
          class="w-full px-3 py-3 rounded-lg border border-gray-300 text-sm bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        />

        <button 
          type="submit"
          class="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-base transition-all duration-200 shadow-md hover:shadow-lg active:shadow-md"
        >
          Register
        </button>
      </form>

      <p class="mt-4 text-sm text-gray-600">
        Already have an account?
        <span @click="$router.push('/login')" class="text-blue-600 cursor-pointer font-semibold hover:underline">
          Login
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import api from "../api/axios";

export default {
  setup() {
    const name = ref("");
    const email = ref("");
    const password = ref("");

    const doRegister = async () => {
      try {
        await api.post("/auth/register", {
          name: name.value,
          email: email.value,
          password: password.value,
          role: "user"
        });

        alert("Account created successfully!");
        window.location.href = "/login";
      } catch (err) {
        alert("Registration failed!");
      }
    };

    return { name, email, password, doRegister };
  },
};
</script>