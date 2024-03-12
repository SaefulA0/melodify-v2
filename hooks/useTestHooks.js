import { useEffect, useState } from "react";

export default function useTestHooks({ spotifyAPI, playlistId }) {
  const [playlist, setPlaylist] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (spotifyAPI.getAccessToken()) {
          const data = await spotifyAPI.getPlaylist(playlistId);
          setPlaylist(data.body);
          setLoading(false);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [playlistId]);

  return { playlist, error, loading };
}
