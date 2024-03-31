<template>
  <div>
    <SearchBar @searchMovies="searchMovies" />
    <div v-if="isLoading">
      <Spinner />
    </div>
    <TorrentSearchTable v-else :torrentSearchResult="torrentSearchResult" />
  </div>
</template>

<script setup lang="ts">
import type { Listing } from "@spacepumpkin/torrent-galaxy-api/dist/types";

const torrentSearchResult = ref<Listing[]>([]);
const isLoading = ref(false);

const searchMovies = async (inputField: string) => {
  isLoading.value = true;
  try {
    const response: Listing[] = await $fetch("/api/torrentSearch", {
      method: "post",
      body: { torrent: inputField },
    });
    torrentSearchResult.value = response;
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>
