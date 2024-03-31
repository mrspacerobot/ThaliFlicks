import { progressEmitter } from "./torrentDownload";

export default defineEventHandler(async (): Promise<number> => {
  return new Promise((resolve, reject) => {
    progressEmitter.on("progress", (percent) => {
      resolve(percent);
    });
  });
});
