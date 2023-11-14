import { useEffect, useState } from "react";
import useSpotify from "./useSpotify";

function useGetTopTracks() {
  const spotifyAPI = useSpotify();
  const [getTopTrack, setGetTopTrack] = useState(null);

  useEffect(() => {
    const fecthGetTopTrack = async () => {
      const trackInfo = await fetch(
        `https://api.spotify.com/v1/me/top/tracks`,
        {
          headers: {
            Authorization: `Bearer ${spotifyAPI.getAccessToken()}`,
          },
        }
      ).then((res) => res.json());
      setGetTopTrack(trackInfo);
    };

    fecthGetTopTrack();
  }, [spotifyAPI]);

  return getTopTrack;
}

export default useGetTopTracks;
