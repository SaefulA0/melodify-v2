import React, { useEffect, useState } from "react";
import { shuffle } from "lodash";

import useSpotify from "../../hooks/useSpotify";
import Layout from "../../components/Layout/LayoutComp";
import Song from "../../components/SongComp";
import { getSession, useSession } from "next-auth/react";
import useGetPlaylistsUser from "../../hooks/useGetPlaylistUser";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { toast } from "react-toastify";

const FromColors = [
  "from-indigo-500",
  "from-green-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
  "from-blue-500",
  "from-red-500",
];

const ToColors = [
  "to-indigo-200",
  "to-green-200",
  "to-yellow-200",
  "to-pink-200",
  "to-purple-200",
  "to-blue-200",
  "to-red-200",
];

export default function selectedPlaylist({ playlistId }) {
  const selectedPlaylistId = playlistId;
  const [fromColor, setFromColor] = useState(null);
  const [toColor, setToColor] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  const { data: session } = useSession();

  const spotifyAPI = useSpotify();

  useEffect(() => {
    setFromColor(shuffle(FromColors).pop());
    setToColor(shuffle(ToColors).pop());
  }, [selectedPlaylistId]);

  useEffect(() => {
    if (spotifyAPI.getAccessToken()) {
      spotifyAPI.getPlaylist(selectedPlaylistId).then((data) => {
        setPlaylist(data.body);
      });
    }
  }, [session, spotifyAPI]);

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
  const HandleSavePlaylist = () => {
    if (spotifyAPI.getAccessToken()) {
      spotifyAPI
        .followPlaylist(`${selectedPlaylistId}`, {
          public: false,
        })
        .then((data) => {
          successToast();
          console.log("BENER ", data);
        })
        .catch((err) => {
          failToast();
          console.log("ADA YANG SALAH ", err);
        });
    }
  };

  // GET PLAYLISTS USER
  const playlistsUser = useGetPlaylistsUser();

  return (
    <Layout pageTitle={playlist?.name}>
      <div className="min-h-screen max-w-full p-8 pt-11 md:flex bg-[#F4F5FC] border shadow-sm rounded-l-3xl">
        {/* flex kiri */}
        <div className="md:basis-full md:mr-10">
          {/* Main content */}
          <div className="md:mb-10">
            <h1 className="text-4xl text-gray-800 font-bold mb-4">Playlist</h1>
            {/* <MusicRecommendation /> */}
            <div
              className={`relative flex gap-5 w-full h-32 md:h-52 mb-5 p-4 md:p-10 bg-gradient-to-b ${fromColor} ${toColor} rounded-md`}
            >
              <div className="w-24 md:w-40 flex justify-center items-center">
                {playlist?.images[0] ? (
                  <img
                    className="rounded-md aspect-square object-cover w-full mb-1"
                    src={playlist.images?.[0]?.url}
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
              <div className="mr-2 flex flex-col items-start">
                <h1 className="text-5xl font-semibold text-slate-100 mb-3">
                  {playlist?.name}
                </h1>
                <p>{playlist?.description}</p>
              </div>
              <button
                onClick={HandleSavePlaylist}
                className="absolute right-5 top-5 w-fit flex flex-row gap-2 py-2 px-4 bg-gray-800 text-sm rounded-md"
              >
                <MdOutlinePlaylistAdd size={24} />
                Simpan
              </button>
            </div>
          </div>
          {/* tranding saat ini */}
          <div className="mb-28">
            {/* card playlist */}
            <h2 className="text-lg text-gray-800 font-bold mb-4">Musik</h2>
            <div className="flex flex-col space-y-1 text-gray-500 mb-20">
              {playlist?.tracks.items.map((track, i) => (
                <Song
                  key={i}
                  track={track}
                  order={i}
                  playlist={playlistsUser}
                />
              ))}
            </div>
          </div>
        </div>

        {/* flex kanan */}
        <div className="md:basis-1/2">{/* playlist */}</div>
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
