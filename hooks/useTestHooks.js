import { useEffect, useState } from "react";

export default function useTestHooks({
  spotifyAPI,
  currentMood,
  selectedGenre,
}) {
  const [recommendationsPlaylist, setRecommendationsPlaylist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPlaylist = async (mood, genre) => {
    try {
      setLoading(true);
      const response = await spotifyAPI.searchPlaylists(
        `Playlist for a ${mood} mood with the ${genre} genre`,
        { limit: 8 }
      );
      setRecommendationsPlaylist(response.body);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentMood && selectedGenre) {
      fetchPlaylist(currentMood, selectedGenre);
    }
  }, [currentMood, selectedGenre, spotifyAPI]);

  return { recommendationsPlaylist, loading, error };
}
