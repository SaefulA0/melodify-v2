import { useEffect, useState } from "react";
import useSpotify from "./useSpotify";

export default function useGetPlaylistsUser() {
  const spotifyAPI = useSpotify();
  const [playlistsUser, setPlaylistsUser] = useState([]);

  useEffect(() => {
    const fecthPlaylistsUser = async () => {
      const playlistsUserInfo = await fetch(
        `https://api.spotify.com/v1/me/playlists`,
        {
          headers: {
            Authorization: `Bearer ${spotifyAPI.getAccessToken()}`,
          },
        }
      ).then((res) => res.json());
      setPlaylistsUser(playlistsUserInfo.items);
    };

    fecthPlaylistsUser();
  }, [spotifyAPI]);

  return playlistsUser;
}
