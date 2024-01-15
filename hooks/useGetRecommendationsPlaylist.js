import { useEffect, useState } from "react";

export default function useGetRecommendationsPlaylist({
  spotifyAPI,
  currentMood,
  selectedGenre,
}) {
  const [recommendationsPlaylist, setRecommendationsPlaylist] = useState();

  const fetchRecommendationsPlaylist = async (currentMood, selectedGenre) => {
    try {
      const response = await spotifyAPI.searchPlaylists(
        `Playlist for a ${currentMood} mood with the ${selectedGenre} genre`,
        { limit: 10 }
      );
      setRecommendationsPlaylist(response.body);
    } catch (error) {
      console.error("Something went wrong!", error);
    }
  };

  useEffect(() => {
    if (currentMood && selectedGenre) {
      fetchRecommendationsPlaylist(currentMood, selectedGenre);
    }
  }, [currentMood, selectedGenre, spotifyAPI]);

  return recommendationsPlaylist;
}
