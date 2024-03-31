<template>
  <div class="flex justify-center p-2">
    <form
      @submit.prevent="searchMovies"
      class="flex items-center border border-gray-300 rounded-lg w-screen"
    >
      <input
        type="text"
        v-model="inputField"
        name="search"
        placeholder="Search..."
        class="rounded-l-lg focus:outline-none focus:border-blue-500 flex-grow ml-2 hover:border-blue-500 hover:bg-gray-100"
      />
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-r-lg"
      >
        <svg
          class="w-6 h-6 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l4.25 4.25a1 1 0 1 0 1.41-1.41L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          />
        </svg>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["searchMovies"]);
const inputField = ref("");

const searchMovies = () => {
  emit("searchMovies", inputField.value);
};
</script>
