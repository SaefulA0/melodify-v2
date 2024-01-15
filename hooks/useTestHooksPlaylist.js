import { useEffect, useState } from "react";

export default function useTestHooksPlaylist({
  spotifyAPI,
  currentMood,
  selectedGenre,
}) {
  const [recommendationsPlaylist, setRecommendationsPlaylist] = useState(null);

  const fetchPlaylist = async (mood, genre) => {
    try {
      const response = await spotifyAPI.searchPlaylists(
        `Playlist for a ${mood} mood with the ${genre} genre`,
        { limit: 8 }
      );
      console.log(response);
      setRecommendationsPlaylist(response.body);
    } catch (error) {
      console.error("Something went wrong!", error);
    }
  };

  useEffect(() => {
    if (currentMood && selectedGenre) {
      fetchPlaylist(currentMood, selectedGenre);
    }
  }, [currentMood, selectedGenre, spotifyAPI]);

  return recommendationsPlaylist;
}
