import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "@/atoms/songAtom";
import useSpotify from "@/hooks/useSpotify";
import React from "react";
import { AiOutlinePlaySquare } from "react-icons/ai";

export default function TopTrack({ items }) {
  const spotifyAPI = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(items.id);
    setIsPlaying(true);
    spotifyAPI.play({
      uris: [items.uri],
    });
  };

  return (
    <>
      <div className="flex gap-3 items-center my-4">
        <img
          className="w-10 h-10 rounded-md"
          src={items.album.images[0].url}
          alt="Album Img"
        />
        <div>
          <p className="w-32 lg:w-64 truncate text-gray-900 font-semibold">
            {items.name}
          </p>
          <p className="w-32 lg:w-64 truncate">{items.artists[0].name}</p>
        </div>
        <button
          className="hover:text-black cursor-pointer transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-300"
          onClick={playSong}
        >
          <AiOutlinePlaySquare size={32} />
        </button>
      </div>
    </>
  );
}
