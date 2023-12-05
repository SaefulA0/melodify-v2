import { useEffect, useState } from "react";
import useSpotify from "./useSpotify";

export default function useGetUserPlaylists({ spotifyAPI }) {
  const [userPlaylists, setUserPlaylists] = useState([]);

  useEffect(() => {
    const fecthGetUserPlaylists = async () => {
      const playlistsInfo = await fetch(
        `https://api.spotify.com/v1/me/playlists`,
        {
          headers: {
            Authorization: `Bearer ${spotifyAPI.getAccessToken()}`,
          },
        }
      ).then((res) => res.json());
      setUserPlaylists(playlistsInfo.items);
    };

    fecthGetUserPlaylists();
  }, [spotifyAPI]);

  return userPlaylists;
}
