import { useEffect, useState } from "react";
import useSpotify from "./useSpotify";

function useGetAvailableGenre() {
  const spotifyAPI = useSpotify();
  const [availableGenre, setGetAvailableGenre] = useState(null);

  useEffect(() => {
    const fecthGetAvailableGenre = async () => {
      const genreInfo = await fetch(
        `https://api.spotify.com/v1/recommendations/available-genre-seeds`,
        {
          headers: {
            Authorization: `Bearer ${spotifyAPI.getAccessToken()}`,
          },
        }
      ).then((res) => res.json());
      setGetAvailableGenre(genreInfo);
    };

    fecthGetAvailableGenre();
  }, [spotifyAPI]);

  return availableGenre;
}

export default useGetAvailableGenre;
