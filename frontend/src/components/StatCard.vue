<template>
  <div class="bg-white rounded-xl shadow p-6 text-center">
    <p class="text-gray-500 text-sm">{{ title }}</p>
    <p class="text-3xl font-bold mt-2">{{ value }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    value: [String, Number]
  }
};
</script>
