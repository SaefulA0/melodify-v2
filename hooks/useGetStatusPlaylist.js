import { useEffect, useState } from "react";

export default function useGetStatusPlaylist({
  spotifyAPI,
  userId,
  selectedPlaylistId,
}) {
  const [statusPlaylist, setStatusPlaylist] = useState(null);

  useEffect(() => {
    if (spotifyAPI.getAccessToken()) {
      const fecthPlaylistInfo = async () => {
        if (selectedPlaylistId) {
          const playlistInfo = await fetch(
            `https://api.spotify.com/v1/playlists/${selectedPlaylistId}/followers/contains?ids=${selectedPlaylistId}`,
            {
              headers: {
                Authorization: `Bearer ${spotifyAPI.getAccessToken()}`,
              },
            }
          ).then((res) => res.json());
          setStatusPlaylist(playlistInfo);
        }
      };
      fecthPlaylistInfo();
    }
  }, [spotifyAPI]);

  return statusPlaylist;
}
