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
import { ref } from "vue";
import type { Listing } from "@spacepumpkin/torrent-galaxy-api/dist/types";

const torrentSearchResult = ref<Listing[]>([]);
const isLoading = ref(false);

const searchMovies = async (inputField: string) => {
  isLoading.value = true;
  console.log(inputField);
  try {
    const response: Listing[] = await $fetch("/api/torrentSearch", {
      method: "post",
      body: { torrent: inputField },
    });
    torrentSearchResult.value = response;
    console.log(response);
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>
