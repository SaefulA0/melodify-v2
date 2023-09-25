import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Layout from "@/components/LayoutComp";
import useSpotify from "@/hooks/useSpotify";
import { useSession } from "next-auth/react";
import PlaylistComp from "@/components/PlaylistComp";

export default function Playlist() {
  const router = useRouter();
  const { data: session } = useSession();
  const spotifyAPI = useSpotify();
  const [playlistsUser, setPlaylistsUser] = useState([]);

  useEffect(() => {
    if (spotifyAPI.getAccessToken()) {
      spotifyAPI.getUserPlaylists().then((data) => {
        setPlaylistsUser(data.body.items);
      });
    }
  }, [session, spotifyAPI]);

  return (
    <Layout pageTitle="Daftar Putar">
      <div className="min-h-screen max-w-full p-8 pt-11 md:flex bg-[#F4F5FC] border shadow-sm rounded-l-3xl">
        {/* flex kiri */}
        <div className="md:basis-full md:mr-10">
          {/* home */}
          <div className="md:mb-10">
            <h1 className="text-4xl text-gray-700 font-bold mb-4">
              Daftar Putar
            </h1>
            {/* <MusicRecommendation /> */}
            <div className="flex md:justify-between w-full h-32 md:h-52 mb-5 p-4 md:p-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md">
              <div className="mr-2 flex flex-col justify-between items-start">
                <p className="text-lg font-normal text-slate-100">
                  Buatlah suasana yang tak terlupakan dengan daftar putar musik
                  pribadimu.
                </p>
                <button
                  type="button"
                  className="flex-shrink-0 text-white bg-indigo-700 border-0 py-1.5 px-4 focus:outline-none transition ease-in-out hover:bg-indigo-800 hover:-translate-y-1 duration-300 rounded-lg text-base mt-10 sm:mt-0 shadow-lg"
                >
                  Buat Daftar Putar
                </button>
              </div>
              <div className="w-24 md:w-32 h-24 md:h-32 flex justify-center items-center">
                <Image
                  src="/imgs/logo.png"
                  width={512}
                  height={512}
                  alt="face-recognition"
                />
              </div>
            </div>
          </div>
          {/* tranding saat ini */}
          <div className="mb-28">
            {/* card playlist */}
            <h2 className="text-lg text-gray-700 font-bold mb-4">
              Daftar Putar Kamu
            </h2>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {playlistsUser.map((playlist, i) => (
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
