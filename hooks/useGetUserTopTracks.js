import { useEffect, useState } from "react";

export default function useGetUserTopTracks({ spotifyAPI }) {
  const [getUserTopTrack, setGetUserGetTopTrack] = useState(null);

  useEffect(() => {
    if (spotifyAPI.getAccessToken()) {
      spotifyAPI.getMyTopTracks().then((data) => {
        setGetUserGetTopTrack(data.body);
      });
    }
  }, [spotifyAPI]);

  return getUserTopTrack;
}
