import { useEffect, useState } from "react";

export default function useGetTopGlobal({ spotifyAPI }) {
  const [getTopGlobalPlaylist, setGetTopGlobalPlaylist] = useState(null);

  useEffect(() => {
    if (spotifyAPI.getAccessToken()) {
      spotifyAPI.getPlaylist("37i9dQZEVXbMDoHDwVN2tF").then((data) => {
        setGetTopGlobalPlaylist(data.body);
      });
    }
  }, [spotifyAPI]);

  return getTopGlobalPlaylist;
}
