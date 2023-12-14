import { useEffect, useState } from "react";

export default function useGetTopGlobal({ spotifyAPI }) {
  const [getTopGlobalTrack, setGetTopGlobalTrack] = useState(null);

  useEffect(() => {
    if (spotifyAPI.getAccessToken()) {
      spotifyAPI.getPlaylist("37i9dQZEVXbMDoHDwVN2tF").then((data) => {
        setGetTopGlobalTrack(data.body);
      });
    }
  }, [spotifyAPI]);

  return getTopGlobalTrack;
}
