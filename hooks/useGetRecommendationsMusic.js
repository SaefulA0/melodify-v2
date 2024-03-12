import { useEffect, useState } from "react";

export default function useGetRecommendationsMusic({
  spotifyAPI,
  currentMood,
  selectedGenre,
}) {
  const [recommendationsMusic, setRecommendationsMusic] = useState();

  useEffect(() => {
    const fetchRecommendationsMusic = async () => {
      try {
        let options = {
          market: "ID",
          seed_genres: [`${selectedGenre}`],
        };

        switch (currentMood) {
          case "happy":
            options.min_energy = 0.5;
            options.max_energy = 1.0;
            options.min_valence = 0.5;
            options.max_valence = 1.0;
            options.market = "ID";
            break;
          case "sad":
            options.min_energy = 0.0;
            options.max_energy = 0.5;
            options.min_valence = 0.0;
            options.max_valence = 0.5;
            options.market = "ID";
            break;
          case "neutral":
            options.min_energy = 0.0;
            options.max_energy = 0.5;
            options.min_valence = 0.5;
            options.max_valence = 1.0;
            options.market = "ID";
            break;
          case "angry":
            options.min_energy = 0.5;
            options.max_energy = 1.0;
            options.min_valence = 0.0;
            options.max_valence = 0.5;
            options.market = "ID";
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

    if (currentMood && selectedGenre) {
      fetchRecommendationsMusic();
    }
  }, [selectedGenre, currentMood, spotifyAPI]);

  return recommendationsMusic;
}
