import { search, setAntiCaptchaKey } from "@spacepumpkin/torrent-galaxy-api";
import {
  Listing,
  SearchOpts,
} from "@spacepumpkin/torrent-galaxy-api/dist/types";
import { filterTorrentsByMovieTitle } from "~/utils/torrentSearchFilter";

export interface TorrentSearchEvent {
  torrent: string;
}

export default defineEventHandler(
  async (event: Promise<TorrentSearchEvent>): Promise<Listing[]> => {
    const torrentSearchEvent = await readBody<TorrentSearchEvent>(event);
    setAntiCaptchaKey("de963dc0173470d42a13bd969af5772e");
    const searchOps: SearchOpts = {
      term: torrentSearchEvent.torrent,
    };

    const results: Listing[] = await search(searchOps);

    const filteredTorrents: Listing[] = filterTorrentsByMovieTitle(
      torrentSearchEvent.torrent,
      results,
    );
    return filteredTorrents;
  },
);
