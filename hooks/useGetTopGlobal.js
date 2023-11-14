import { useEffect, useState } from "react";
import useSpotify from "./useSpotify";

function useGetTopGlobal() {
  const spotifyAPI = useSpotify();
  const [getTopGlobal, setGetTopGlobal] = useState(null);

  useEffect(() => {
    const fecthGetTopGlobal = async () => {
      const globalInfo = await fetch(
        `https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF`,
        {
          headers: {
            Authorization: `Bearer ${spotifyAPI.getAccessToken()}`,
          },
        }
      ).then((res) => res.json());
      setGetTopGlobal(globalInfo);
    };

    fecthGetTopGlobal();
  }, [spotifyAPI]);

  return getTopGlobal;
}

export default useGetTopGlobal;
