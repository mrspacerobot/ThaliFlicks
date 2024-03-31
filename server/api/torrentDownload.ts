import WebTorrent from "webtorrent-hybrid";
import { EventEmitter } from "events";

const client = new WebTorrent();
const progressEmitter = new EventEmitter();

function downloadTorrent(magnetURI: string) {
  client.add(magnetURI, { path: "downloads" }, (torrent) => {
    console.log("Torrent downloading...");
    torrent.on("download", (bytes) => {
      // Calculate download progress percentage
      const percent = (torrent.progress * 100).toFixed(2);
      console.log(`Downloaded ${bytes} bytes (${percent}% downloaded)`);

      // Emit progress event with the percentage
      progressEmitter.emit("progress", percent);
    });

    torrent.on("done", () => {
      console.log("Torrent download finished");
      // Emit completion event
      progressEmitter.emit("complete");
      progressEmitter.removeListener("progress", progressHandler);
    });

    torrent.on("error", (err) => {
      console.error("Torrent download error:", err);
      // Emit error event
      progressEmitter.emit("error", err);
    });

    const progressHandler = (percent: number) => {
      // Handle progress updates
      console.log(`Progress: ${percent}%`);
    };
  });
}

export { progressEmitter };

export default defineEventHandler(
  async (event: Promise<{ magnetURI: string }>) => {
    const { magnetURI } = await readBody(event);
    downloadTorrent(magnetURI);
  },
);
