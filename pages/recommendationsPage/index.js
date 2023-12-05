import Layout from "../../components/Layout/LayoutComp";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import useSpotify from "../../hooks/useSpotify";
import RecommendSong from "../../components/RecommendSongComp";
import PlaylistComp from "../../components/PlaylistComp";
import { getSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import useGetUserPlaylists from "../../hooks/useGetUserPlaylists";
import {
  currentMoodState,
  selectedGenreState,
} from "../../atoms/recommendationsAtom";
import { useRouter } from "next/router";

export default function recommendationsPage() {
  const [banner, setBanner] = useState("");
  const [recommendationsMusic, setRecommendationsMusic] = useState();
  const [recommendationsPlaylist, setRecommendationsPlaylist] = useState();
  const [currentMood, setCurrentMood] = useRecoilState(currentMoodState);
  const [selectedGenre, setSelectedGenre] = useRecoilState(selectedGenreState);
  // const currentMood = "happy";
  // const selectedGenre = "rock";
  const router = useRouter();

  // GET ACCESSTOKEN
  const spotifyAPI = useSpotify();

  // GET PLAYLISTS USER
  const userPlaylists = useGetUserPlaylists({ spotifyAPI });

  useEffect(() => {
    let forBanner = "";
    // KONDISI SUASANA HATI HAPPY
    if (currentMood === "happy") {
      forBanner = "Mood kamu saat ini sedang senang";
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
          setRecommendationsMusic(data.body.tracks);
        })
        .catch((err) => console.log("Something went wrong!", err));
      // MENDAPATKAN REKOMENDASI DAFTAR PUTAR MUSIK
      spotifyAPI
        .searchPlaylists(
          `Playlist for a happy mood with the ${selectedGenre} genre`,
          { limit: 8 }
        )
        .then((data) => {
          setRecommendationsPlaylist(data.body.playlists.items);
        })
        .catch((err) => console.log("Something went wrong!", err));

      // KONDISI SUASANA HATI SAD
    } else if (currentMood === "sad") {
      forBanner = "Mood kamu saat ini sedang sedih";
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
          setRecommendationsMusic(data.body.tracks);
        })
        .catch((err) => console.log("Something went wrong!", err));
      // MENDAPATKAN REKOMENDASI DAFTAR PUTAR MUSIK
      spotifyAPI
        .searchPlaylists(
          `Playlist for a sad mood with the ${selectedGenre} genre`,
          {
            limit: 8,
          }
        )
        .then((data) => {
          setRecommendationsPlaylist(data.body.playlists.items);
        })
        .catch((err) => console.log("Something went wrong!", err));

      // KONDISI SUASANA HATI CALM
    } else if (currentMood === "neutral") {
      forBanner = "Mood kamu saat ini sedang rileks";
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
          setRecommendationsMusic(data.body.tracks);
        })
        .catch((err) => console.log("Something went wrong!", err));
      // MENDAPATKAN REKOMENDASI DAFTAR PUTAR MUSIK
      spotifyAPI
        .searchPlaylists(
          `Playlist for a calm mood with the ${selectedGenre} genre`,
          {
            limit: 8,
          }
        )
        .then((data) => {
          setRecommendationsPlaylist(data.body.playlists.items);
        })
        .catch((err) => console.log("Something went wrong!", err));

      // KONDISI SUASANA HATI ANGRY
    } else if (currentMood === "angry") {
      forBanner = "Mood kamu saat ini sedang marah";
      // MENDAPATKAN REKOMENDASI MUSIK
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
          setRecommendationsMusic(data.body.tracks);
        })
        .catch((err) => console.log("Something went wrong!", err));
      // MENDAPATKAN REKOMENDASI DAFTAR PUTAR MUSIK
      spotifyAPI
        .searchPlaylists(
          `Playlist for a angry mood with the ${selectedGenre} genre`,
          { limit: 8 }
        )
        .then((data) => {
          setRecommendationsPlaylist(data.body.playlists.items);
        })
        .catch((err) => console.log("Something went wrong!", err));
    }

    setBanner(forBanner);
  }, [selectedGenre, currentMood]);

  return (
    <Layout pageTitle="Rekomendasi">
      <div className="min-h-screen max-w-full p-8 pt-20 md:pt-11 md:flex shadow-sm rounded-l-3xl">
        {/* flex kiri */}
        <div className="md:basis-full md:mr-10">
          {/* home */}
          <div className="md:mb-10">
            <h1 className="text-4xl text-gray-800 font-bold mb-4">
              Rekomendasi
            </h1>
            <div className="flex md:justify-between w-full h-fit md:h-52 mb-5 p-4 md:p-10 bg-gradient-to-r from-zinc-800 via-zinc-900 to-zinc-700 rounded-md shadow-lg">
              <div className="w-full md:w-10/12 mr-2 flex flex-col justify-between items-start">
                {/* Perlihatkan ekspresi wajahmu. Ungkapkan moodmu dengan satu klik. */}
                {banner ? (
                  <>
                    <div className="mb-3">
                      <h3 className="text-lg md:text-3xl font-semibold text-slate-100 mb-1">
                        {banner}
                      </h3>
                      <p className="text-sm md:text-base text-gray-400">
                        berikut rekomendasi musik dan playlist yang sesuai
                        dengan suasana hati kamu
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        router.push(
                          "/recommendationsPage/getRecommendationsPage"
                        )
                      }
                      className="flex-shrink-0 text-white bg-gradient-to-r from-[#EF733A] to-[#EF9E33] border-0 py-1.5 px-4 focus:outline-none transition ease-in-out hover:-translate-y-1 duration-300 rounded-lg text-base shadow-lg"
                    >
                      Ulangi
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="text-base md:text-xl font-semibold text-slate-200 mb-1">
                      Dapatkan rekomendasi musik dan daftar putar yang sesuai
                      dengan mood kamu!
                    </h3>
                    <button
                      type="button"
                      onClick={() =>
                        router.push(
                          "/recommendationsPage/getRecommendationsPage"
                        )
                      }
                      className="flex-shrink-0 text-white bg-gradient-to-r from-[#EF733A] to-[#EF9E33] border-0 py-1.5 px-4 focus:outline-none transition ease-in-out hover:-translate-y-1 duration-300 rounded-lg text-base shadow-lg"
                    >
                      Dapatkan Rekomendasi
                    </button>
                  </>
                )}
              </div>
              <div className="w-32 h-32 md:w-32 md:h-32 flex justify-center items-center">
                {banner ? (
                  <>
                    <Image
                      src={`/imgs/expressionStiker/${currentMood}.png`}
                      width={512}
                      height={512}
                      alt="face-recognition"
                      className="rounded-xl"
                    />
                  </>
                ) : (
                  <>
                    <Image
                      src="/imgs/face-recognition.png"
                      width={512}
                      height={512}
                      alt="face-recognition"
                      className="rounded-xl"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white px-5 py-6 border shadow-md rounded-md">
            <h2 className="text-lg text-gray-700 font-bold mb-4">
              Rekomendasi Musik
            </h2>
            {/* Rekomendasi musik*/}
            {recommendationsMusic ? (
              <div className="w-full h-fit flex flex-col space-y-1 text-gray-500">
                {recommendationsMusic?.map((track, i) => (
                  <RecommendSong
                    key={i}
                    track={track}
                    order={i}
                    playlist={userPlaylists}
                    spotifyAPI={spotifyAPI}
                  />
                ))}
              </div>
            ) : (
              <>
                <div className="p-5 text-gray-800 text-sm md:text-base flex justify-center items-center w-full h-20 border text-center bg-white shadow-lg rounded-lg">
                  Dapatkan rekomendasi terlebih dahulu seblum mendapatkan
                  rekomendasi musik
                </div>
              </>
            )}
          </div>
        </div>
        {/* flex kanan */}
        <div className="md:basis-1/2">
          {/* Rekomendasi daftar putar*/}
          <div className="mt-12">
            <h2 className="text-lg text-gray-700 font-bold mb-4">
              Rekomendasi Daftar Putar
            </h2>
            {/* card playlist */}
            {recommendationsMusic ? (
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {recommendationsPlaylist.map((playlist, i) => (
                  <PlaylistComp key={i} playlist={playlist} />
                ))}
              </div>
            ) : (
              <>
                <div className="p-5 text-sm md:text-base flex justify-center items-center w-full h-20 border text-center bg-white shadow-lg rounded-lg text-gray-800">
                  Dapatkan rekomendasi terlebih dahulu sebelum mendapatkan
                  rekomendasi playlist
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/landingPage",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
