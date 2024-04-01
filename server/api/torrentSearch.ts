import { filterTorrentsByMovieTitle } from "~/utils/torrentSearchFilter";
import { piratebay } from "piratebay-scraper";
import { TPBResult } from "piratebay-scraper/interfaces";

export interface TorrentSearchEvent {
  torrent: string;
}

export default defineEventHandler(
  async (event: Promise<TorrentSearchEvent>): Promise<TPBResult[]> => {
    const torrentSearchEvent = await readBody<TorrentSearchEvent>(event);

    const results: TPBResult[] = await piratebay.search(
      torrentSearchEvent.torrent,
    );

    const filteredTorrents: TPBResult[] = filterTorrentsByMovieTitle(
      torrentSearchEvent.torrent,
      results,
    );

    return filteredTorrents;
  },
);
