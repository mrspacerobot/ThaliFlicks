<template>
  <div class="flex justify-center w-screen py-2">
    <div class="overflow-x-auto">
      <table class="table-auto">
        <thead>
          <tr>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Upload Date</th>
            <th class="px-4 py-2">Seeders</th>
            <th class="px-4 py-2">Leechers</th>
            <th class="px-4 py-2">Magnet</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="torrent in torrentSearchResult" :key="torrent.href">
            <td class="border px-4 py-2">{{ torrent.title }}</td>
            <td class="border px-4 py-2">{{ torrent.uploadDate }}</td>
            <td class="border px-4 py-2">{{ torrent.seeders }}</td>
            <td class="border px-4 py-2">{{ torrent.leachers }}</td>
            <td class="border px-4 py-2">
              <button
                :disabled="downloadInProgress"
                @click="handleDownloadClick(torrent)"
                class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
              >
                Download
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="downloadInProgress" class="mt-4">
      <ProgressBar :downloadProgress="downloadProgress" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Listing } from "@spacepumpkin/torrent-galaxy-api/dist/types";

const downloadProgress = ref<number>(0);
const downloadInProgress = ref(false);

defineProps<{ torrentSearchResult: Listing[] }>();

const handleDownloadClick = (torrent: Listing) => {
  downloadInProgress.value = true;

  $fetch("/api/torrentDownload", {
    method: "post",
    body: { magnetURI: torrent.magnet },
  });
};

watch(downloadInProgress, (value) => {
  if (value) {
    const interval = setInterval(() => {
      $fetch<number>("/api/torrentDownloadStatus").then((response) => {
        downloadProgress.value = response;
        if (response === 100) {
          downloadInProgress.value = false;
          downloadProgress.value = 0;
          clearInterval(interval);
        }
      });
    }, 100);
  }
});
</script>
