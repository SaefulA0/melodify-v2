import React, { useEffect, useState } from "react";
import useSpotify from "../../hooks/useSpotify";
import Layout from "../../components/Layout/LayoutComp";
import Song from "../../components/SongComp";
import { getSession } from "next-auth/react";
import useGetUserPlaylists from "../../hooks/useGetUserPlaylists";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { toast } from "react-toastify";

export default function selectedPlaylistPage({ playlistId, session }) {
  const selectedPlaylistId = playlistId;
  const [playlist, setPlaylist] = useState(null);

  // GET ACCESSTOKEN
  const spotifyAPI = useSpotify();

  // GET PLAYLISTS USER
  const userPlaylists = useGetUserPlaylists({ spotifyAPI });

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

  return (
    <Layout pageTitle={playlist?.name}>
      <div className="max-w-full min-h-screen px-2 md:px-8 pt-16 md:pt-12 pb-8 md:flex shadow-sm">
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
              <div className="w-3/4 mr-2 flex flex-col items-start">
                <h1 className="text-2xl md:text-3xl font-semibold text-slate-100 mb-1 md:mb-3">
                  {playlist?.name}
                </h1>
                <p className="text-xs md:text-base text-gray-400">
                  {playlist?.description}
                </p>
              </div>
              <div className="flex items-center gap-3 absolute right-5 bottom-5 text-white">
                {/* <a
                  href={playlist?.external_urls?.spotify}
                  target="_blank"
                  className="flex gap-1 items-center bg-gradient-to-r from-[#EF733A] to-[#EF9E33] border-0 py-1.5 px-4 focus:outline-none transition ease-in-out hover:-translate-y-1 duration-300 rounded-lg text-base shadow-lg"
                >
                  <SlSocialSpotify size={20} />
                  Buka
                </a> */}
                <button
                  onClick={HandleSavePlaylist}
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
              {playlist?.tracks.items.map((track, i) => (
                <Song
                  key={i}
                  track={track}
                  order={i}
                  playlist={userPlaylists}
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
