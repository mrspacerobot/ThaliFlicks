<template>
    <div class="flex justify-center py-2">
      <div class="overflow-x-auto w-full">
        <div class="swiper-slide" v-for="torrent in formattedTorrentTitles" :key="torrent.link">
          <div class="card border p-4 shadow-lg rounded-md">
            <div class="flex flex-col items-center"> <!-- Apply flexbox and center vertically and horizontally -->
              <h3 class="text-xl font-semibold">{{ torrent.title }}</h3>
              <p class="text-gray-600">Uploaded: {{ torrent.uploaded }}</p>
              <p class="text-gray-600">Seeders: {{ torrent.seeders }}</p>
              <p class="text-gray-600">Leechers: {{ torrent.leechers }}</p>
              <p class="text-gray-600">Size: {{ torrent.size }}</p>
              <button
                :disabled="downloadInProgress"
                @click="handleDownloadClick(torrent)"
                class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mt-4"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="downloadInProgress" class="mt-4">
        <ProgressBar :downloadProgress="downloadProgress" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  
  import type { TPBResult } from 'piratebay-scraper/interfaces';
  
  const downloadProgress = ref<number>(0);
  const downloadInProgress = ref(false);
  
  const props = defineProps<{ torrentSearchResult: TPBResult[] }>();
  
  const handleDownloadClick = (torrent: TPBResult) => {
    downloadInProgress.value = true;
  
    $fetch('/api/torrentDownload', {
      method: 'post',
      body: { magnetURI: torrent.link },
    });
  };
  
  const formattedTorrentTitles = computed(() => {
    return props.torrentSearchResult.map((torrent) => {
      return {
        ...torrent,
        title: torrent.title.replace(/\./g, ' '),
      };
    });
  });
  
  watch(downloadInProgress, (value) => {
    if (value) {
      const interval = setInterval(() => {
        $fetch<number>('/api/torrentDownloadStatus').then((response) => {
          downloadProgress.value = response;
          console.log(response);
          if (Math.abs(response - 100) < 0.01) {
            downloadInProgress.value = false;
            downloadProgress.value = 0;
            clearInterval(interval);
          }
        });
      }, 100);
    }
  });
  </script>
  
  <style scoped>
  .card {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>
  