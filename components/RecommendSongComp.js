import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import React from "react";
import { LiaSpotify } from "react-icons/lia";
import { useRecoilState } from "recoil";
import ModalAddTrack from "./Modals/ModalAddTrack";

export default function RecommendSong({ track, order, playlist }) {
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(track.id);
    setIsPlaying(true);
  };

  return (
    <>
      <div
        className="grid grid-cols-2 py-4 px-6 rounded-lg cursor-pointer delay-100 hover:bg-gray-200 duration-300 border-b"
        onClick={playSong}
      >
        <div className="flex items-center space-x-4">
          <p>{order + 1}</p>
          <img
            className="w-10 h-10 rounded-lg"
            src={track.album.images[0].url}
            alt="Album Img"
          />
          <div>
            <p className="w-32 lg:w-64 truncate text-gray-900 font-semibold">
              {track.name}
            </p>
            <p className="w-32 lg:w-64 truncate"> {track.artists[0].name}</p>
          </div>
        </div>
        <div className="flex items-center justify-between ml-auto md:ml-0">
          <p className="w-64 truncate hidden md:inline">{track.album.name}</p>
          <div className="flex">
            <a
              href={track.external_urls.spotify}
              target="_blank"
              className="flex gap-1 text-gray-700 w-full items-center cursor-pointer text-sm rounded-b-md px-2 py-3 hover:bg-gray-400 hover:bg-opacity-20"
            >
              <LiaSpotify size={24} />
            </a>
            <ModalAddTrack idsong={track.id} playlist={playlist} />
          </div>
        </div>
      </div>
    </>
  );
}
