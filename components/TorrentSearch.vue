<template>
  <div>
    <SearchBar @searchMovies="searchMovies" />
    <div v-if="isLoading">
      <Spinner />
    </div>
    <TorrentSearchTable
      v-else-if="!isLoading && torrentSearchResult.length > 0"
      :torrentSearchResult="torrentSearchResult"
    />
    <ErrorModal :errorMessage="errorMessage" />
  </div>
</template>

<script setup lang="ts">
import type { TPBResult } from "piratebay-scraper/interfaces";

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
</script>
