import { useEffect, useState } from "react";

export default function useGetRecommendationsMusic({
  spotifyAPI,
  currentMood,
  selectedGenre,
}) {
  const [getRecommendationsMusic, setGetRecommendationsMusic] = useState(null);

  useEffect(() => {
    // KONDISI SUASANA HATI HAPPY
    if (currentMood === "happy") {
      // MENDAPATKAN REKOMENDASI MUSIK
      spotifyAPI
        .getRecommendations({
          min_energy: 0.5,
          max_energy: 1.0,
          min_valence: 0.5,
          max_valence: 1.0,
          seed_genres: [`${selectedGenre}`],
        })
        .then((data) => {
          setGetRecommendationsMusic(data.body);
        })
        .catch((err) => console.log("Something went wrong!", err));

      // KONDISI SUASANA HATI SAD
    } else if (currentMood === "sad") {
      // MENDAPATKAN REKOMENDASI MUSIK
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
          setGetRecommendationsMusic(data.body);
        })
        .catch((err) => console.log("Something went wrong!", err));
      // KONDISI SUASANA HATI CALM
    } else if (currentMood === "neutral") {
      // MENDAPATKAN REKOMENDASI MUSIK
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
          setGetRecommendationsMusic(data.body);
        })
        .catch((err) => console.log("Something went wrong!", err));
      // KONDISI SUASANA HATI ANGRY
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
          setGetRecommendationsMusic(data.body);
        })
        .catch((err) => console.log("Something went wrong!", err));
    }
  }, [selectedGenre, currentMood]);

  return getRecommendationsMusic;
}
