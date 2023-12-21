import React from "react";
import Image from "next/image";
import { getSession } from "next-auth/react";
// COMPONENTS
import Layout from "../../components/Layout/LayoutComp";
import PlaylistComp from "../../components/PlaylistComp";
import ModalCreatePlaylist from "../../components/Modals/ModalCreatePlaylist";
// COSTUM HOOKS
import useSpotify from "../../hooks/useSpotify";
import useGetUserPlaylists from "../../hooks/useGetUserPlaylists";

export default function playlistsPage() {
  // GET ACCESSTOKEN
  const spotifyAPI = useSpotify();

  // GET PLAYLISTS USER
  const userPlaylists = useGetUserPlaylists({ spotifyAPI });

  return (
    <Layout pageTitle="Daftar Putar">
      <div className="min-h-screen max-w-full px-6 pt-16 md:pt-11 md:flex rounded-l-3xl">
        {/* flex kiri */}
        <div className="md:basis-full md:mr-10">
          <div className="md:mb-10">
            <h1 className="text-4xl text-gray-800 font-bold mb-4">
              Daftar Putar
            </h1>
            <div className="flex md:justify-between w-full h-36 md:h-52 mb-5 p-4 md:p-10 bg-gradient-to-r from-zinc-800 via-zinc-900 to-zinc-700 rounded-md shadow-lg">
              <div className="mr-2 flex flex-col justify-between items-start">
                <p className="text-base md:text-xl font-semibold text-slate-200 mb-1">
                  Buatlah suasana yang tak terlupakan dengan daftar putar musik
                  pribadimu.
                </p>
                <ModalCreatePlaylist spotifyAPI={spotifyAPI} />
              </div>
              <div className="w-44 md:w-40 flex justify-center items-center">
                <Image
                  src="/imgs/albumCover.png"
                  width={512}
                  height={512}
                  alt="logo"
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
          {/* tranding saat ini */}
          <div className="mb-28">
            {/* card playlist */}
            <h2 className="text-lg text-gray-800 font-bold mb-4">
              Daftar Putar Kamu
            </h2>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {userPlaylists?.items?.map((playlist, i) => (
                <PlaylistComp key={i} playlist={playlist} />
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
