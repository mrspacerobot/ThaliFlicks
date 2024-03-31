<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-12 rounded-lg">
      <h2 class="text-xl font-semibold mb-4">Download Progress</h2>
      <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
        <div
          :style="{ width: downloadProgress + '%' }"
          class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
        >
          {{ downloadProgress }}%
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ downloadProgress: number }>();
</script>
