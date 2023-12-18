import { useEffect, useState } from "react";

export default function useGetPlaylist({ spotifyAPI, playlistId }) {
  const [getPlaylist, setGetPlaylist] = useState(null);

  useEffect(() => {
    if (spotifyAPI.getAccessToken()) {
      spotifyAPI.getPlaylist(playlistId).then((data) => {
        setGetPlaylist(data.body);
      });
    }
  }, [playlistId]);

  return getPlaylist;
}
