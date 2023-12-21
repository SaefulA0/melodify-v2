import { useEffect, useState } from "react";

export default function useGetPlaylist({ spotifyAPI, playlistId }) {
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    if (spotifyAPI.getAccessToken()) {
      spotifyAPI.getPlaylist(playlistId).then((data) => {
        setPlaylist(data.body);
      });
    }
  }, [playlistId]);

  return playlist;
}
