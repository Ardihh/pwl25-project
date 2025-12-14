<template>
  <div class="min-h-screen bg-gray-50">
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default { components: { Navbar } };
</script>