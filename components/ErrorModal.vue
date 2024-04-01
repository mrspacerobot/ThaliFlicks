<template>
  <div
    class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50"
    v-if="errorMessage"
  >
    <div class="bg-white p-6 rounded-lg">
      <h2 class="text-xl font-bold mb-4">Error</h2>
      <p class="text-red-600">{{ errorMessage }}</p>
      <button
        @click="closeModal"
        class="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const errorMessage = ref("");

const closeModal = () => {
  errorMessage.value = "";
};
</script>
