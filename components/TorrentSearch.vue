<template>
  <div>
    <SearchBar @searchMovies="searchMovies" />
    <div v-if="isLoading">
      <Spinner />
    </div>
    <div v-else-if="!isLoading && torrentSearchResult.length > 0"
>
    <!-- Conditionally render TorrentCard or TorrentSearchTable based on device width -->
    <template v-if="isMobile">
      <TorrentCard :torrentSearchResult="torrentSearchResult" />
    </template>
    <template v-else>
      <TorrentSearchTable  :torrentSearchResult="torrentSearchResult" />
    </template>
  </div>
    <ErrorModal :errorMessage="errorMessage" />
  </div>
</template>

<script setup lang="ts">
import type { TPBResult } from "piratebay-scraper/interfaces";
import { ref, computed } from 'vue';

const torrentSearchResult = ref<TPBResult[]>([]);
const isLoading = ref(false);
const errorMessage = ref("");

const searchMovies = async (inputField: string) => {
  isLoading.value = true;
  try {
    const response: TPBResult[] = await $fetch("/api/torrentSearch", {
      method: "post",
      body: { torrent: inputField },
    });
    if (response.length === 0) {
      errorMessage.value = "No results found.";
      return;
    }
    torrentSearchResult.value = response;
  } catch (error) {
    console.error("Error fetching data:", error);
    errorMessage.value = "An error occurred while fetching data.";
  } finally {
    isLoading.value = false;
  }
};

// Compute whether the device is mobile based on screen width
const isMobile = computed(() => {
  return window.innerWidth <= 768; // Adjust the breakpoint as needed
});
</script>
