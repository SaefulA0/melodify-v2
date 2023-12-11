import { useEffect, useState } from "react";

export default function useSelectedPlaylist({
  spotifyAPI,
  selectedPlaylistId,
}) {
  const [getSelectedPlaylist, setGetSelectedPlaylist] = useState(null);

  useEffect(() => {
    if (spotifyAPI.getAccessToken()) {
      spotifyAPI.getPlaylist(selectedPlaylistId).then((data) => {
        setGetSelectedPlaylist(data.body);
      });
    }
  }, [selectedPlaylistId]);

  return getSelectedPlaylist;
}
