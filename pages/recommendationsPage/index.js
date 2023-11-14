import Layout from "../../components/Layout/LayoutComp";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import useSpotify from "../../hooks/useSpotify";
import RecommendSong from "../../components/RecommendSongComp";
import PlaylistComp from "../../components/PlaylistComp";
import { getSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import useGetPlaylistsUser from "../../hooks/useGetPlaylistUser";
import {
  currentMoodState,
  selectedGenreState,
} from "../../atoms/recommendationsAtom";

export default function recommendationsPage() {
  const getPlaylistsUser = useGetPlaylistsUser();
  const [banner, setBanner] = useState("");
  const [recommendationsMusic, setRecommendationsMusic] = useState();
  const [recommendationsPlaylist, setRecommendationsPlaylist] = useState();

  const [currentMood, setCurrentMood] = useRecoilState(currentMoodState);
  const [selectedGenre, setSelectedGenre] = useRecoilState(selectedGenreState);

  const spotifyAPI = useSpotify();

  // RECOMMENDATION
  // const handleMoodChange = (e) => {
  //   setMood(e.target.value);
  // };

  useEffect(() => {
    let forBanner = "";
    // KONDISI SUASANA HATI HAPPY
    if (currentMood === "happy") {
      forBanner = "Suasana hati kamu saat ini sedang senang";
      // MENDAPATKAN REKOMENDASI MUSIK
      spotifyAPI
        .getRecommendations({
          min_energy: 0.5,
          max_energy: 1.0,
          min_valence: 0.5,
          max_valence: 1.0,
          seed_genres: [`${selectedGenre}`],
          min_popularity: 50,
        })
        .then((data) => {
          setRecommendationsMusic(data.body.tracks);
        })
        .catch((err) => console.log("Something went wrong!", err));
      // MENDAPATKAN REKOMENDASI DAFTAR PUTAR MUSIK
      spotifyAPI
        .searchPlaylists("Playlist for happy mood", { limit: 8 })
        .then((data) => {
          setRecommendationsPlaylist(data.body.playlists.items);
        })
        .catch((err) => console.log("Something went wrong!", err));

      // KONDISI SUASANA HATI SAD
    } else if (currentMood === "sad") {
      forBanner = "Suasana hati kamu saat ini sedang sedih";
      // MENDAPATKAN REKOMENDASI MUSIK
      spotifyAPI
        .getRecommendations({
          market: "ID",
          min_energy: 0.0,
          max_energy: 0.5,
          min_valence: 0.0,
          max_valence: 0.5,
          seed_genres: [`${selectedGenre}`],
          min_popularity: 50,
        })
        .then((data) => {
          setRecommendationsMusic(data.body.tracks);
        })
        .catch((err) => console.log("Something went wrong!", err));
      // MENDAPATKAN REKOMENDASI DAFTAR PUTAR MUSIK
      spotifyAPI
        .searchPlaylists("Playlist for sad mood", { limit: 8 })
        .then((data) => {
          setRecommendationsPlaylist(data.body.playlists.items);
        })
        .catch((err) => console.log("Something went wrong!", err));

      // KONDISI SUASANA HATI CALM
    } else if (currentMood === "neutral") {
      forBanner = "Suasana hati kamu saat ini sedang tenang";
      // MENDAPATKAN REKOMENDASI MUSIK
      spotifyAPI
        .getRecommendations({
          market: "ID",
          min_energy: 0.0,
          max_energy: 0.5,
          min_valence: 0.5,
          max_valence: 1.0,
          seed_genres: [`${selectedGenre}`],
          min_popularity: 50,
        })
        .then((data) => {
          setRecommendationsMusic(data.body.tracks);
        })
        .catch((err) => console.log("Something went wrong!", err));
      // MENDAPATKAN REKOMENDASI DAFTAR PUTAR MUSIK
      spotifyAPI
        .searchPlaylists("Playlist for calm mood", { limit: 8 })
        .then((data) => {
          setRecommendationsPlaylist(data.body.playlists.items);
        })
        .catch((err) => console.log("Something went wrong!", err));

      // KONDISI SUASANA HATI ANGRY
    } else if (currentMood === "angry") {
      forBanner = "Suasana hati kamu saat ini sedang marah";
      // MENDAPATKAN REKOMENDASI MUSIK
      spotifyAPI
        .getRecommendations({
          market: "ID",
          min_energy: 0.5,
          max_energy: 1.0,
          min_valence: 0.0,
          max_valence: 0.5,
          seed_genres: [`${selectedGenre}`],
          min_popularity: 50,
        })
        .then((data) => {
          setRecommendationsMusic(data.body.tracks);
        })
        .catch((err) => console.log("Something went wrong!", err));
      // MENDAPATKAN REKOMENDASI DAFTAR PUTAR MUSIK
      spotifyAPI
        .searchPlaylists("Playlist for angry mood", { limit: 8 })
        .then((data) => {
          setRecommendationsPlaylist(data.body.playlists.items);
        })
        .catch((err) => console.log("Something went wrong!", err));
    }

    setBanner(forBanner);
  }, [currentMood, selectedGenre]);

  return (
    <Layout pageTitle="Rekomendasi">
      <div className="min-h-screen max-w-full p-8 pt-20 md:pt-11 md:flex bg-[#F4F5FC] border shadow-sm rounded-l-3xl">
        {/* flex kiri */}
        <div className="md:basis-full md:mr-10">
          {/* home */}
          <div className="md:mb-10">
            <h1 className="text-4xl text-gray-800 font-bold mb-4">
              Rekomendasi
            </h1>
            <div className="flex md:justify-between w-full h-32 md:h-52 mb-5 p-4 md:p-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md shadow-lg">
              <div className="w-10/12 mr-2 flex flex-col justify-between items-start">
                {/* Perlihatkan ekspresi wajahmu. Ungkapkan moodmu dengan satu klik. */}
                {banner ? (
                  <>
                    <p className="text-sm md:text-lg font-normal text-gray-800-100">
                      {banner} <br />
                      berikut rekomendasi musik dan playlist yang sesuai dengan
                      suasana hati kamu
                    </p>
                  </>
                ) : (
                  <p className="text-sm md:text-lg font-normal text-slate-100">
                    Perlihatkan ekspresi wajahmu. Ungkapkan moodmu dengan satu
                    klik.
                  </p>
                )}
                <a
                  type="button"
                  href="/recommendationsPage/mood"
                  className="mt-3 md:mt-0 flex-shrink-0 text-sm md:text-base text-white bg-indigo-700 border-0 py-1.5 px-4 focus:outline-none transition ease-in-out hover:bg-indigo-800 hover:-translate-y-1 duration-300 rounded-lg shadow-lg"
                >
                  Identifikasi
                </a>
              </div>
              <div className="w-24 md:w-32 h-24 md:h-32 flex justify-center items-center">
                <Image
                  src="/imgs/face-recognition.png"
                  width={512}
                  height={512}
                  alt="face-recognition"
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
          <div className="mb-10 text-gray-800">
            {/* XXXXXXXXX */}
            {/* <div className="w-full justify-between p-1 border border-red-800 flex items-center gap-2">
              <div>
                <label htmlFor="moodInput">Suasana Hati:</label>
                <input
                  className="border"
                  type="text"
                  id="moodInput"
                  value={mood}
                  onChange={handleMoodChange}
                />
              </div>
              <div>
                <label htmlFor="genreInput">genre:</label>
                <select className="w-fit text-black" onChange={handleGenre}>
                  {availableGenre &&
                    availableGenre.genres.map((genres, i) => (
                      <option key={i} value={genres}>
                        {genres}
                      </option>
                    ))}
                </select>
              </div>
              <button
                className="p-1 bg-indigo-400 rounded-md"
                onClick={handleRecommendation}
              >
                Send
              </button>
            </div> */}
            {/* XXXXXXXXX */}
            <h2 className="text-lg text-gray-700 font-bold mb-4">
              Rekomendasi Musik
            </h2>
            {/* Rekomendasi musik*/}
            {recommendationsMusic ? (
              <div className="w-full h-fit flex flex-col space-y-1 text-gray-500 mb-20">
                {recommendationsMusic?.slice(0, 10).map((track, i) => (
                  <RecommendSong
                    key={i}
                    track={track}
                    order={i}
                    playlist={getPlaylistsUser}
                  />
                ))}
              </div>
            ) : (
              <>
                <div className="p-5 text-sm md:text-base flex justify-center items-center w-full h-20 border text-center bg-slate-100 shadow-lg rounded-lg">
                  Identifikasi moodmu terlebih dahulu seblum mendapatkan
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
              Rekomendasi Playlist
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
                <div className="p-5 text-sm md:text-base flex justify-center items-center w-full h-20 border text-center bg-slate-100 shadow-lg rounded-lg text-gray-800">
                  Identifikasi moodmu terlebih dahulu sebelum mendapatkan
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
