import { test } from "vitest";
import {
  filterTorrentsByMovieTitle,
  isMovieTitleInString,
} from "../utils/torrentSearchFilter";
import type { TPBResult } from "piratebay-scraper/interfaces";

test("filterTorrentsByMovieTitle function", async ({ expect }) => {
  const movieTitle = "inside out 2015";
  const torrents: TPBResult[] = [
    {
      title: "Inside.Out.2015.HDRip.XViD-ETRG",
      seeders: 100,
      leechers: 50,
      size: "1.2 GiB",
      uploaded: "2021-08-01 12:00:00 GMT",
      uploader: "ETRG",
      link: "magnet:?xt=urn:btih:1234567890",
    },
    {
      title: "Life-Below-Zero-S15E04-Inside-Out-720p-WEB-h264",
      seeders: 10,
      leechers: 5,
      size: "500 MiB",
      uploaded: "2021-08-01 12:00:00 GMT",
      uploader: "ETRG",
      link: "magnet:?xt=urn:btih:1234567890",
    },
    {
      title: "Some other movie",
      seeders: 10,
      leechers: 5,
      size: "500 MiB",
      uploaded: "2021-08-01 12:00:00 GMT",
      uploader: "ETRG",
      link: "magnet:?xt=urn:btih:1234567890",
    },
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
