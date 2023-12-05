import { useEffect, useState } from "react";
import useSpotify from "./useSpotify";

export default function useGetUserTopTracks({ spotifyAPI }) {
  const [getUserTopTrack, setUserGetTopTrack] = useState(null);

  useEffect(() => {
    const fecthGetTopTrack = async () => {
      const topTracksInfo = await fetch(
        `https://api.spotify.com/v1/me/top/tracks`,
        {
          headers: {
            Authorization: `Bearer ${spotifyAPI.getAccessToken()}`,
          },
        }
      ).then((res) => res.json());
      setUserGetTopTrack(topTracksInfo);
    };

    fecthGetTopTrack();
  }, [spotifyAPI]);

  return getUserTopTrack;
}
