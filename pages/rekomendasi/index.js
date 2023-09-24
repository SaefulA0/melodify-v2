import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Image from "next/image";
import useSpotify from "@/hooks/useSpotify";
import RecommendSongs from "@/components/recommendSong/RecommendSongs";
import PlaylistsMap from "@/components/playlist/PlaylistsMap";

export default function daftarPutar() {
  const router = useRouter();
  const [mood, setMood] = useState("");
  const [banner, setBanner] = useState("");
  const spotifyAPI = useSpotify();
  const [recommendationsMusic, setRecommendationsMusic] = useState();
  const [recommendationsPlaylist, setRecommendationsPlaylist] = useState();

  const handleMoodChange = (e) => {
    setMood(e.target.value);
  };

  const handleRecommendation = () => {
    // Lakukan logika untuk merekomendasikan musik berdasarkan suasana hati
    // Anda dapat menggunakan API musik seperti Spotify atau menggunakan data statis
    // Contoh sederhana:
    let forBanner = "";

    if (mood === "happy") {
      forBanner = "Suasana hati kamu saat ini sedang senang";
      // untuk mendapatkan rekomendasi musik
      spotifyAPI
        .getRecommendations({
          min_energy: 0.5,
          max_energy: 1.0,
          min_valence: 0.5,
          max_valence: 1.0,
          seed_genres: ["pop"],
          min_popularity: 50,
        })
        .then((data) => {
          setRecommendationsMusic(data.body.tracks);
        })
        .catch((err) => console.log("Something went wrong!", err));
      // untuk mendapatkan rekomendasi daftar putar musik
      spotifyAPI
        .searchPlaylists("Playlist for happy mood", { limit: 8 })
        .then((data) => {
          setRecommendationsPlaylist(data.body.playlists.items);
        })
        .catch((err) => console.log("Something went wrong!", err));
    } else if (mood === "sad") {
      forBanner = "Suasana hati kamu saat ini sedang sedih";
      spotifyAPI
        .getRecommendations({
          market: "ID",
          min_energy: 0.0,
          max_energy: 0.5,
          min_valence: 0.0,
          max_valence: 0.5,
          seed_genres: ["pop"],
          min_popularity: 50,
        })
        .then((data) => {
          setRecommendationsMusic(data.body.tracks);
        })
        .catch((err) => console.log("Something went wrong!", err));
      // untuk mendapatkan rekomendasi daftar putar musik
      spotifyAPI
        .searchPlaylists("Playlist for sad mood", { limit: 8 })
        .then((data) => {
          setRecommendationsPlaylist(data.body.playlists.items);
        })
        .catch((err) => console.log("Something went wrong!", err));
    } else if (mood === "calm") {
      forBanner = "Suasana hati kamu saat ini sedang tenang";
      spotifyAPI
        .getRecommendations({
          market: "ID",
          min_energy: 0.0,
          max_energy: 0.5,
          min_valence: 0.5,
          max_valence: 1.0,
          seed_genres: ["pop"],
          min_popularity: 50,
        })
        .then((data) => {
          setRecommendationsMusic(data.body.tracks);
        })
        .catch((err) => console.log("Something went wrong!", err));
      // untuk mendapatkan rekomendasi daftar putar musik
      spotifyAPI
        .searchPlaylists("Playlist for calm mood", { limit: 8 })
        .then((data) => {
          setRecommendationsPlaylist(data.body.playlists.items);
        })
        .catch((err) => console.log("Something went wrong!", err));
    } else if (mood === "angry") {
      forBanner = "Suasana hati kamu saat ini sedang marah";
      spotifyAPI
        .getRecommendations({
          market: "ID",
          min_energy: 0.5,
          max_energy: 1.0,
          min_valence: 0.0,
          max_valence: 0.5,
          seed_genres: ["pop"],
          min_popularity: 50,
        })
        .then((data) => {
          setRecommendationsMusic(data.body.tracks);
        })
        .catch((err) => console.log("Something went wrong!", err));
      spotifyAPI
        .searchPlaylists("Playlist for angry mood", { limit: 8 })
        .then((data) => {
          setRecommendationsPlaylist(data.body.playlists.items);
        })
        .catch((err) => console.log("Something went wrong!", err));
    }
    setBanner(forBanner);
  };

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
                <button
                  type="button"
                  onClick={() => router.push("/mood")}
                  className="mt-3 md:mt-0 flex-shrink-0 text-sm md:text-base text-white bg-indigo-700 border-0 py-1.5 px-4 focus:outline-none transition ease-in-out hover:bg-indigo-800 hover:-translate-y-1 duration-300 rounded-lg shadow-lg"
                >
                  Identifikasi
                </button>
              </div>
              <div className="w-24 md:w-32 h-24 md:h-32 flex justify-center items-center">
                <Image
                  src="/imgs/face-recognition.png"
                  width={512}
                  height={512}
                  alt="face-recognition"
                />
              </div>
            </div>
          </div>
          <div className="mb-10 text-gray-800">
            {recommendationsMusic ? null : (
              <div className="p-1 border border-red-800 flex items-center justify-center gap-2">
                <label htmlFor="moodInput">Suasana Hati:</label>
                <input
                  className="border"
                  type="text"
                  id="moodInput"
                  value={mood}
                  onChange={handleMoodChange}
                />
                <button
                  className="p-1 bg-indigo-400 rounded-md"
                  onClick={handleRecommendation}
                >
                  Send
                </button>
              </div>
            )}
            <h2 className="text-lg text-gray-700 font-bold mb-4">
              Rekomendasi Musik
            </h2>
            {/* Rekomendasi musik*/}
            {recommendationsMusic ? (
              <RecommendSongs track={recommendationsMusic} />
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
              <PlaylistsMap playlist={recommendationsPlaylist} />
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
