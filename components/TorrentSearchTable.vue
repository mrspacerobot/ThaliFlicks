<template>
  <div class="flex justify-center py-2">
    <div class="overflow-x-auto w-full">
      <table class="table-fixed w-full">
        <thead>
          <tr>
            <th class="px-4 py-2 w-1/4 sm:w-auto text-center">Name</th>
            <th class="px-4 py-2 text-center">Upload Date</th>
            <th class="px-4 py-2 text-center">Seeders</th>
            <th class="px-4 py-2 text-center">Leechers</th>
            <th class="px-4 py-2 text-center">Size</th>
            <th class="px-4 py-2 text-center">Magnet</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="torrent in torrentSearchResult" :key="torrent.link">
            <td class="border px-4 py-2 break-all sm:break-normal text-center">
              {{ torrent.title }}
            </td>
            <td class="border px-4 py-2 break-all sm:break-normal text-center">
              {{ torrent.uploaded }}
            </td>
            <td class="border px-4 py-2 text-center">{{ torrent.seeders }}</td>
            <td class="border px-4 py-2 text-center">{{ torrent.leechers }}</td>
            <td class="border px-4 py-2 text-center">{{ torrent.size }}</td>
            <td class="border px-4 py-2 text-center">
              <button
                :disabled="downloadInProgress"
                @click="handleDownloadClick(torrent)"
                class="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-lg"
              >
                <DownloadIcon />
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
import type { TPBResult } from "piratebay-scraper/interfaces";

const downloadProgress = ref<number>(0);
const downloadInProgress = ref(false);

defineProps<{ torrentSearchResult: TPBResult[] }>();

const handleDownloadClick = (torrent: TPBResult) => {
  downloadInProgress.value = true;

  $fetch("/api/torrentDownload", {
    method: "post",
    body: { magnetURI: torrent.link },
  });
};

watch(downloadInProgress, (value) => {
  if (value) {
    const interval = setInterval(() => {
      $fetch<number>("/api/torrentDownloadStatus").then((response) => {
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
