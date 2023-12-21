import { useEffect, useState } from "react";

export default function useGetUserTopTracks({ spotifyAPI }) {
  const [userTopTrack, setUserGetTopTrack] = useState(null);

  useEffect(() => {
    if (spotifyAPI.getAccessToken()) {
      spotifyAPI.getMyTopTracks().then((data) => {
        setUserGetTopTrack(data.body);
      });
    }
  }, [spotifyAPI]);

  return userTopTrack;
}
