import { useEffect, useState } from "react";

export default function useGetRecommendationsPlaylist({
  spotifyAPI,
  currentMood,
  selectedGenre,
}) {
  const [getRecommendationsPlaylist, setGetRecommendationsPlaylist] =
    useState(null);

  useEffect(() => {
    // KONDISI SUASANA HATI HAPPY
    if (currentMood === "happy") {
      spotifyAPI
        .searchPlaylists(
          `Playlist for a happy mood with the ${selectedGenre} genre`,
          { limit: 8 }
        )
        .then((data) => {
          setGetRecommendationsPlaylist(data.body);
        })
        .catch((err) => console.log("Something went wrong!", err));

      // KONDISI SUASANA HATI SAD
    } else if (currentMood === "sad") {
      spotifyAPI
        .searchPlaylists(
          `Playlist for a sad mood with the ${selectedGenre} genre`,
          {
            limit: 8,
          }
        )
        .then((data) => {
          setGetRecommendationsPlaylist(data.body);
        })
        .catch((err) => console.log("Something went wrong!", err));

      // KONDISI SUASANA HATI CALM
    } else if (currentMood === "neutral") {
      spotifyAPI
        .searchPlaylists(
          `Playlist for a calm mood with the ${selectedGenre} genre`,
          {
            limit: 8,
          }
        )
        .then((data) => {
          setGetRecommendationsPlaylist(data.body);
        })
        .catch((err) => console.log("Something went wrong!", err));

      // KONDISI SUASANA HATI ANGRY
    } else if (currentMood === "angry") {
      spotifyAPI
        .searchPlaylists(
          `Playlist for a angry mood with the ${selectedGenre} genre`,
          { limit: 8 }
        )
        .then((data) => {
          setGetRecommendationsPlaylist(data.body);
        })
        .catch((err) => console.log("Something went wrong!", err));
    }
  }, [selectedGenre, currentMood]);

  return getRecommendationsPlaylist;
}
