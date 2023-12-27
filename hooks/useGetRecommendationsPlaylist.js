import { useEffect, useState } from "react";

export default function useGetRecommendationsPlaylist({
  spotifyAPI,
  currentMood,
  selectedGenre,
}) {
  const [recommendationsPlaylist, setRecommendationsPlaylist] = useState(null);

  useEffect(() => {
    if (currentMood === "happy") {
      spotifyAPI
        .searchPlaylists(
          `Playlist for a happy mood with the ${selectedGenre} genre`,
          { limit: 8 }
        )
        .then((data) => {
          setRecommendationsPlaylist(data.body);
        })
        .catch((err) => console.log("Something went wrong!", err));
    } else if (currentMood === "sad") {
      spotifyAPI
        .searchPlaylists(
          `Playlist for a sad mood with the ${selectedGenre} genre`,
          {
            limit: 8,
          }
        )
        .then((data) => {
          setRecommendationsPlaylist(data.body);
        })
        .catch((err) => console.log("Something went wrong!", err));
    } else if (currentMood === "neutral") {
      spotifyAPI
        .searchPlaylists(
          `Playlist for a calm mood with the ${selectedGenre} genre`,
          {
            limit: 8,
          }
        )
        .then((data) => {
          setRecommendationsPlaylist(data.body);
        })
        .catch((err) => console.log("Something went wrong!", err));
    } else if (currentMood === "angry") {
      spotifyAPI
        .searchPlaylists(
          `Playlist for a angry mood with the ${selectedGenre} genre`,
          { limit: 8 }
        )
        .then((data) => {
          setRecommendationsPlaylist(data.body);
        })
        .catch((err) => console.log("Something went wrong!", err));
    }
  }, [selectedGenre, currentMood]);

  return recommendationsPlaylist;
}
