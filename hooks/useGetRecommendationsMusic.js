import { useEffect, useState } from "react";

export default function useGetRecommendationsMusic({
  spotifyAPI,
  currentMood,
  selectedGenre,
}) {
  const [recommendationsMusic, setRecommendationsMusic] = useState(null);

  useEffect(() => {
    if (currentMood === "happy") {
      spotifyAPI
        .getRecommendations({
          min_energy: 0.5,
          max_energy: 1.0,
          min_valence: 0.5,
          max_valence: 1.0,
          seed_genres: [`${selectedGenre}`],
        })
        .then((data) => {
          setRecommendationsMusic(data.body);
        })
        .catch((err) => console.log("Something went wrong!", err));
    } else if (currentMood === "sad") {
      spotifyAPI
        .getRecommendations({
          market: "ID",
          min_energy: 0.0,
          max_energy: 0.5,
          min_valence: 0.0,
          max_valence: 0.5,
          seed_genres: [`${selectedGenre}`],
        })
        .then((data) => {
          setRecommendationsMusic(data.body);
        })
        .catch((err) => console.log("Something went wrong!", err));
    } else if (currentMood === "neutral") {
      spotifyAPI
        .getRecommendations({
          market: "ID",
          min_energy: 0.0,
          max_energy: 0.5,
          min_valence: 0.5,
          max_valence: 1.0,
          seed_genres: [`${selectedGenre}`],
        })
        .then((data) => {
          setRecommendationsMusic(data.body);
        })
        .catch((err) => console.log("Something went wrong!", err));
    } else if (currentMood === "angry") {
      spotifyAPI
        .getRecommendations({
          market: "ID",
          min_energy: 0.5,
          max_energy: 1.0,
          min_valence: 0.0,
          max_valence: 0.5,
          seed_genres: [`${selectedGenre}`],
        })
        .then((data) => {
          setRecommendationsMusic(data.body);
        })
        .catch((err) => console.log("Something went wrong!", err));
    }
  }, [selectedGenre, currentMood]);

  return recommendationsMusic;
}
