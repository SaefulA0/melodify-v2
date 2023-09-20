import { useSession, signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedPlaylistIdState, playlistState } from "@/atoms/playlistAtom";
import useSpotify from "@/hooks/useSpotify";
import Songs from "./Songs";

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
  const [color, setColor] = useState(null);
  const spotifyAPI = useSpotify();
  const selectedPlaylistId = useRecoilValue(selectedPlaylistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

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
      {/* main section */}
      <section
        className={`h-64 pt-20 flex items-center space-x-7 bg-gradient-to-b to-gray-100 ${color} text-gray-800 p-8`}
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
