import type { TPBResult } from "piratebay-scraper/interfaces";

export function filterTorrentsByMovieTitle(
  movieTitle: string,
  torrents: TPBResult[],
): TPBResult[] {
  return torrents.filter((torrent) =>
    isMovieTitleInString(movieTitle, torrent.title!),
  );
}

export function isMovieTitleInString(
  movieTitle: string,
  torrentTitle: string,
): boolean {
  const movieWords = movieTitle.split(" ");
  const pattern = new RegExp(
    "\\b" + movieWords.map((word) => `(?=.*\\b${word}\\b)`).join(""),
    "i",
  );
  return pattern.test(torrentTitle);
}
