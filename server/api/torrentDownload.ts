import WebTorrent from "webtorrent-hybrid";
import { EventEmitter } from "events";
import torrentConfig from "~/torrentConfig";

const client = new WebTorrent();
const progressEmitter = new EventEmitter();
const downloadPath = torrentConfig.downloadPath;

function downloadTorrent(magnetURI: string) {
  function progressHandler(bytes: number) {
    const torrent = this; // "this" refers to the torrent object
    const percent = (torrent.progress * 100).toFixed(2);
    progressEmitter.emit("progress", percent);
  }

  client.add(magnetURI, { path: downloadPath }, (torrent) => {
    torrent.on("download", progressHandler); // Add progressHandler as listener

    torrent.on("done", () => {
      progressEmitter.emit("complete");
      torrent.removeListener("download", progressHandler); // Remove progressHandler
    });

    torrent.on("error", (err) => {
      progressEmitter.emit("error", err);
    });
  });
}

export { progressEmitter };

export default defineEventHandler(
  async (event: Promise<{ magnetURI: string }>) => {
    const { magnetURI } = await readBody(event);
    downloadTorrent(magnetURI);
  },
);
