import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { toast } from "react-toastify";
import { MdOutlinePlaylistAdd } from "react-icons/md";
// COMPONENTS
import Layout from "../../components/Layout/LayoutComp";
import SongComp from "../../components/SongComp";
// COSTUM HOOKS
import useGetUserPlaylists from "../../hooks/useGetUserPlaylists";
import useSpotify from "../../hooks/useSpotify";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import useGetUserTopTracks from "../../hooks/useGetUserTopTracks";

export default function selectedPlaylistPage({ playlistId }) {
  // GET ACCESSTOKEN
  const spotifyAPI = useSpotify();

  // GET PLAYLISTS USER
  const userPlaylists = useGetUserPlaylists({ spotifyAPI });

  // GET SELECTED PLAYLIST
  const playlist = useGetPlaylist({ spotifyAPI, playlistId });

  // GET TOP TRACKS USER
  const userTopTracks = useGetUserTopTracks({ spotifyAPI });

  const successToast = () =>
    toast("Daftar putar musik berhasil disimpan", {
      hideProgressBar: false,
      autoClose: 2000,
      type: "success",
      position: "bottom-left",
      closeOnClick: true,
      draggable: true,
      theme: "light",
    });

  const failToast = () =>
    toast("Daftar putar musik gagal disimpan", {
      hideProgressBar: false,
      autoClose: 2000,
      type: "error",
      position: "bottom-left",
      closeOnClick: true,
      draggable: true,
      theme: "light",
    });

  // ADD PLAYLIST TO A LIBRARY
  const handleSavePlaylist = () => {
    if (spotifyAPI.getAccessToken()) {
      spotifyAPI
        .followPlaylist(`${playlistId}`, {
          public: false,
        })
        .then((data) => {
          successToast();
        })
        .catch((err) => {
          failToast();
        });
    }
  };

  return (
    <Layout pageTitle={playlist?.name}>
      <div className="min-h-screen max-w-full px-6 pt-16 md:pt-11 md:flex rounded-l-3xl mb-16">
        {/* flex kiri */}
        <div className="md:basis-full md:mr-10">
          {/* Main content */}
          <div className="">
            <h1 className="text-4xl text-gray-800 font-bold mb-4">
              Daftar Putar
            </h1>
            <div className="relative flex gap-5 w-full min-h-32 md:h-52 p-4 md:p-10 bg-gradient-to-b from-zinc-800 via-zinc-950 to-zinc-800 rounded-t-md">
              {/* <MusicRecommendation /> */}
              <div className="w-24 md:w-40 flex justify-center items-center">
                {playlist?.images?.[0] ? (
                  <img
                    className="rounded-md aspect-square object-cover w-full mb-1"
                    src={playlist?.images?.[0]?.url}
                    width={128}
                    height={128}
                    alt="Album Image"
                  />
                ) : (
                  <img
                    className="rounded-md aspect-square object-cover w-full mb-1"
                    src="/imgs/albumCover.png"
                    width={128}
                    height={128}
                    alt="Album Image"
                  />
                )}
              </div>
              <div className="w-3/4 mr-2 flex flex-col items-start">
                <h1 className="text-2xl md:text-3xl font-semibold text-slate-100 mb-1 md:mb-3">
                  {playlist?.name}
                </h1>
                <p className="text-xs md:text-base text-gray-400">
                  {playlist?.description}
                </p>
              </div>
              <div className="flex items-center gap-3 absolute right-5 bottom-5 text-white">
                <button
                  onClick={handleSavePlaylist}
                  className="flex items-center bg-gradient-to-r from-[#EF733A] to-[#EF9E33] border-0 py-1.5 px-4 focus:outline-none transition ease-in-out hover:-translate-y-1 duration-300 rounded-lg text-base shadow-lg"
                >
                  <MdOutlinePlaylistAdd size={20} />
                  Simpan
                </button>
              </div>
            </div>
          </div>
          {/* main content*/}
          <div className="px-5 py-6 rounded-b-md bg-white shadow-md border">
            {/* card playlist */}
            <h2 className="text-lg text-gray-800 font-bold mb-4">Musik</h2>
            <div className="flex flex-col space-y-1 text-gray-500">
              {playlist?.tracks.items >= 0 ? (
                <p>
                  Oops sepertinya masih belum ada musik dalam daftar putar ini.
                </p>
              ) : (
                <>
                  {playlist?.tracks.items.map((items, i) => (
                    <SongComp
                      key={items.track.id}
                      track={items.track}
                      playlist={userPlaylists}
                      order={i}
                      spotifyAPI={spotifyAPI}
                      length={true}
                      modelComponent={"Model1"}
                      playlistId={playlistId}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
        {/* flex kanan */}
        <div className="md:basis-1/2">
          {/* User Top Track */}
          <div className="w-full mt-12 px-5 py-6 text-gray-800 bg-white p-4 rounded-md shadow-md">
            <h2 className="text-lg font-bold">Musik Favoritmu</h2>
            {userTopTracks?.items >= 0 ? (
              <>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="p-5 text-gray-800 text-sm md:text-base flex justify-center items-center w-full h-20 border text-center bg-white shadow-lg rounded-lg">
                    Oops sepertinya kamu masih belum memiliki musik favorit.
                  </div>
                </div>
              </>
            ) : (
              <>
                {userTopTracks?.items.slice(0, 5).map((items, i) => (
                  <SongComp
                    key={items.id}
                    track={items}
                    playlist={userPlaylists}
                    order={i}
                    spotifyAPI={spotifyAPI}
                    length={false}
                    modelComponent={"Model2"}
                    playlistId={playlistId}
                  />
                ))}
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
  const { id } = context.params;
  const playlistId = id;

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
      playlistId,
    },
  };
}
