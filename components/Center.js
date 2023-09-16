import { useSession, signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedPlaylistIdState, playlistState } from "@/atoms/playlistAtom";
import useSpotify from "@/hooks/useSpotify";
import Songs from "./Songs";
import useGetTopTrack from "@/hooks/useGetTopTrack";

const colors = [
  "from-indigo-500",
  "from-green-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
  "from-blue-500",
  "from-red-500",
  "from-gray-500",
];

function Center() {
  const { data: session } = useSession();
  const [color, setColor] = useState(null);
  const spotifyAPI = useSpotify();
  const selectedPlaylistId = useRecoilValue(selectedPlaylistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  const getTopTrack = useGetTopTrack();

  console.log(getTopTrack);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [selectedPlaylistId]);

  useEffect(() => {
    spotifyAPI
      .getPlaylist(selectedPlaylistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.log("Something went wrong!", err));
  }, [spotifyAPI, selectedPlaylistId]);

  return (
    <div className="relative flex-grow text-white h-screen overflow-y-scroll scrollbar-hide">
      <header>
        {/* Logout btn*/}
        <button
          className="absolute top-10 right-5 bg-gray-900 flex items-center py-1.5 px-3 w-fit rounded-full hover:bg-black cursor-pointer shadow-lg"
          onClick={() => signOut()}
        >
          <img
            src={session?.user.image}
            alt="Avatar"
            width={42}
            height={42}
            quality={75}
            className="rounded-full"
          />
          <h2 className="w-32 truncate text-gray-300 text-center">
            {session?.user.name}
          </h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 stroke-gray-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
        </button>
      </header>
      {/* main section */}
      <section
        className={`h-64 flex items-center space-x-7 bg-gradient-to-b to-gray-100 ${color} text-gray-800 p-8`}
      >
        <img
          className="h-44 w-44 shadow-2xl object-cover"
          src={playlist?.images?.[0]?.url}
          alt="Playlist Cover"
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h1>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  );
}

export default Center;
