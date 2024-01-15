import { useEffect, useState } from "react";

export default function useTestHooksMusic({
  spotifyAPI,
  currentMood,
  selectedGenre,
}) {
  const [recommendationsMusic, setRecommendationsMusic] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const options = {
          market: "ID",
          seed_genres: [`${selectedGenre}`],
        };

        switch (currentMood) {
          case "happy":
            options.min_energy = 0.5;
            options.max_energy = 1.0;
            options.min_valence = 0.5;
            options.max_valence = 1.0;
            break;
          case "sad":
            options.min_energy = 0.0;
            options.max_energy = 0.5;
            options.min_valence = 0.0;
            options.max_valence = 0.5;
            break;
          case "neutral":
            options.min_energy = 0.0;
            options.max_energy = 0.5;
            options.min_valence = 0.5;
            options.max_valence = 1.0;
            break;
          case "angry":
            options.min_energy = 0.5;
            options.max_energy = 1.0;
            options.min_valence = 0.0;
            options.max_valence = 0.5;
            break;
          default:
            break;
        }
        const data = await spotifyAPI.getRecommendations(options);
        setRecommendationsMusic(data.body);
      } catch (error) {
        console.error("Something went wrong!", error);
      }
    };

    fetchRecommendations();
  }, [selectedGenre, currentMood, spotifyAPI]);

  return recommendationsMusic;
}
