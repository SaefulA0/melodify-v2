import { selectedPlaylistIdState } from "@/atoms/playlistAtom";
import useSpotify from "@/hooks/useSpotify";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Image from "next/image";

export default function Sidebar() {
  const spotifyAPI = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useRecoilState(
    selectedPlaylistIdState
  );

  // console.log(selectedPlaylistId);

  useEffect(() => {
    if (spotifyAPI.getAccessToken()) {
      spotifyAPI.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyAPI]);

  return (
    <div className="relative w-28 md:w-28 h-screen flex flex-col items-center justify-center text-center bg-[#F4F5FC] text-gray-500 p-5 text-xs lg:text-sm border-r overflow-y-scroll scrollbar-hide sm:max-w-[12rem] lg:max-w-[15rem]">
      {/* Up sidebar */}
      <Image
        src="/imgs/logo.png"
        alt="logo"
        width={60}
        height={60}
        priority={true}
        className="w-10 md:w-14 h-10 md:h-14 absolute top-8"
      />
      {/* Home */}
      <button className="w-20 py-2 flex flex-col items-center rounded-xl mb-8 transition ease-in-out hover:bg-indigo-100 hover:-translate-y-1 duration-300 group">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-8 h-8 stroke-gray-700 group-hover:stroke-indigo-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
        <span className="text-xs font-normal mt-1.5 text-gray-700 group-hover:text-indigo-700 group-hover:font-medium">
          Beranda
        </span>
      </button>
      {/* Playlist */}
      <button className="w-20 py-2 flex flex-col items-center rounded-xl mb-8 transition ease-in-out hover:bg-indigo-100 hover:-translate-y-1 duration-300 group">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-8 h-8 stroke-gray-700 group-hover:stroke-indigo-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
          />
        </svg>
        <span className="text-xs font-normal mt-1.5 truncate text-gray-700 group-hover:text-indigo-700 group-hover:font-medium">
          Daftar Putar
        </span>
      </button>
      {/* Mood */}
      <button className="w-20 py-2 flex flex-col items-center rounded-xl mb-8 transition ease-in-out hover:bg-indigo-100 hover:-translate-y-1 duration-300 group">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-8 h-8 stroke-gray-700 group-hover:stroke-indigo-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
        <span className="text-xs font-normal mt-1.5 text-gray-700 group-hover:text-indigo-700 group-hover:font-medium">
          Rekomendasi
        </span>
      </button>
      <hr className="border-t-[0.1px] border-gray-900" />
    </div>
  );
}
