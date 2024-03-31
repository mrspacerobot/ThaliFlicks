import { test } from "vitest";
import {
  filterTorrentsByMovieTitle,
  isMovieTitleInString,
} from "../utils/torrentSearchFilter";
import type { Listing } from "@spacepumpkin/torrent-galaxy-api/dist/types";

test("filterTorrentsByMovieTitle function", async ({ expect }) => {
  const movieTitle = "inside out 2015";
  const torrents: Listing[] = [
    { title: "Inside.Out.2015.HDRip.XViD-ETRG" },
    { title: "Life-Below-Zero-S15E04-Inside-Out-720p-WEB-h264" },
    { title: "Some other movie" },
  ];

  const filteredTorrents = filterTorrentsByMovieTitle(movieTitle, torrents);

  expect(filteredTorrents).toHaveLength(1);
  expect(filteredTorrents[0].title).toBe("Inside.Out.2015.HDRip.XViD-ETRG");
});

test("isMovieTitleInString function", async ({ expect }) => {
  expect(
    isMovieTitleInString("inside out 2015", "Inside.Out.2015.HDRip.XViD-ETRG"),
  ).toBe(true);
  expect(
    isMovieTitleInString(
      "inside out 2015",
      "Life-Below-Zero-S15E04-Inside-Out-720p-WEB-h264",
    ),
  ).toBe(false);
});
