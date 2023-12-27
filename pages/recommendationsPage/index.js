import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
// STATE MANAGEMENT
import {
  currentMoodState,
  selectedGenreState,
} from "../../atoms/recommendationsAtom";
// COMPONENTS
import Layout from "../../components/Layout/LayoutComp";
import SongComp from "../../components/SongComp";
import PlaylistComp from "../../components/PlaylistComp";
// CUSTOM HOOKS
import useSpotify from "../../hooks/useSpotify";
import useGetUserPlaylists from "../../hooks/useGetUserPlaylists";
import useGetRecommendationsMusic from "../../hooks/useGetRecommendationsMusic";
import useGetRecommendationsPlaylist from "../../hooks/useGetRecommendationsPlaylist";

export default function recommendationsPage() {
  const [banner, setBanner] = useState("");
  const [currentMood, setCurrentMood] = useRecoilState(currentMoodState);
  const [selectedGenre, setSelectedGenre] = useRecoilState(selectedGenreState);
  // const currentMood = "happy";
  // const selectedGenre = "pop";
  const router = useRouter();

  // GET ACCESSTOKEN
  const spotifyAPI = useSpotify();

  // GET RECOMMENDATIONS MUSIC
  const recommendationsMusic = useGetRecommendationsMusic({
    spotifyAPI,
    currentMood,
    selectedGenre,
  });

  // GET RECOMMENDATIONS PLAYLIST
  const recommendationsPlaylist = useGetRecommendationsPlaylist({
    spotifyAPI,
    currentMood,
    selectedGenre,
  });

  // GET PLAYLISTS USER
  const userPlaylists = useGetUserPlaylists({ spotifyAPI });

  // SET ARRAY TRACK ID
  const trackUris = recommendationsMusic?.tracks?.map((track) => track.uri);

  // Tambahkan kondisi currentMood dan selectedGenre

  // SET BANNER
  useEffect(() => {
    if (currentMood === "happy") {
      setBanner("Kamu sedang bahagia");
    } else if (currentMood === "sad") {
      setBanner("Kamu sedang sedih");
    } else if (currentMood === "neutral") {
      setBanner("Kamu sedang santai");
    } else if (currentMood === "angry") {
      setBanner("Kamu sedang marah");
    }
  }, [currentMood]);

  const successToast = () =>
    toast("Rekomendasi musik berhasil disimpan", {
      hideProgressBar: false,
      autoClose: 2000,
      type: "success",
      position: "bottom-left",
      closeOnClick: true,
      draggable: true,
      theme: "light",
    });

  const failToast = () =>
    toast("Rekomendasi musik berhasil disimpan", {
      hideProgressBar: false,
      autoClose: 2000,
      type: "error",
      position: "bottom-left",
      closeOnClick: true,
      draggable: true,
      theme: "light",
    });

  const handleSaveRecommendationsMusik = () => {
    if (spotifyAPI.getAccessToken()) {
      spotifyAPI
        .createPlaylist(`Melodimix | ${currentMood}`, {
          description: `Daftar putar musik ${selectedGenre} ketika mood ${banner}`,
          public: false,
        })
        .then((data) => {
          spotifyAPI
            .addTracksToPlaylist(data?.body?.id, trackUris)
            .then((data) => {
              successToast();
            })
            .catch((err) => {
              console.log("Error when adding music = ", err);
              failToast();
            });
        })
        .catch((err) => {
          console.log("Error when creating playlist = ", err);
          failToast();
        });
    }
  };

  return (
    <Layout pageTitle="Rekomendasi">
      <div className="min-h-screen max-w-full px-6 pt-16 md:pt-11 md:flex shadow-sm rounded-l-3xl mb-16">
        {/* flex kiri */}
        <div className="md:basis-full md:mr-10">
          <div className="md:mb-10">
            <h1 className="text-4xl text-gray-800 font-bold mb-4">
              Rekomendasi
            </h1>
            <div className="flex md:justify-between w-full h-fit md:h-52 mb-5 p-4 md:p-10 bg-gradient-to-r from-zinc-800 via-zinc-900 to-zinc-700 rounded-md shadow-lg">
              <div className="w-full md:w-10/12 mr-2 flex flex-col justify-between items-start">
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
                    <div className="flex flex-row items-center gap-5">
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
                      <button
                        onClick={handleSaveRecommendationsMusik}
                        className="flex-shrink-0 text-white bg-gradient-to-r from-[#EF733A] to-[#EF9E33] border-0 py-1.5 px-4 focus:outline-none transition ease-in-out hover:-translate-y-1 duration-300 rounded-lg text-base shadow-lg"
                      >
                        Simpan Rekomendasi
                      </button>
                    </div>
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
                {recommendationsMusic?.tracks?.map((track, i) => (
                  <SongComp
                    key={i}
                    track={track}
                    order={i}
                    playlist={userPlaylists}
                    spotifyAPI={spotifyAPI}
                    length={true}
                    modelComponent={"Model1"}
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
                {recommendationsPlaylist?.playlists?.items?.map(
                  (playlist, i) => (
                    <PlaylistComp key={i} playlist={playlist} />
                  )
                )}
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
