import { useEffect, useState } from "react";

export default function useGetUserPlaylists({ spotifyAPI, userId }) {
  const [userPlaylists, setUserPlaylists] = useState();

  useEffect(() => {
    if (spotifyAPI.getAccessToken(userId)) {
      spotifyAPI.getUserPlaylists(userId).then((data) => {
        setUserPlaylists(data.body);
      });
    }
  }, [spotifyAPI]);

  return userPlaylists;
}
