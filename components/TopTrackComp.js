import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import React from "react";
import ModalAddTrack from "./Modals/ModalAddTrack";
import { LiaSpotify } from "react-icons/lia";

export default function TopTrack({ items, playlist }) {
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(items.id);
    setIsPlaying(true);
    // spotifyAPI.play({
    //   uris: [items.uri],
    // });
  };

  return (
    <>
      <div
        className=" py-4 px-6 rounded-lg cursor-pointer delay-100 hover:bg-gray-200 duration-300"
        onClick={playSong}
      >
        <div className="flex justify-between items-center space-x-4">
          <img
            className="w-10 h-10 rounded-lg"
            src={items.album.images[0].url}
            alt="Album Img"
          />
          <div className="w-32 lg:w-56">
            <p className="truncate text-gray-900 font-semibold">{items.name}</p>
            <p className="truncate">{items.artists[0].name}</p>
          </div>
          <div className="flex">
            <a
              href={items.external_urls.spotify}
              target="_blank"
              className="flex gap-1 text-gray-700 w-full items-center cursor-pointer text-sm rounded-b-md px-2 py-3 hover:bg-gray-400 hover:bg-opacity-20"
            >
              <LiaSpotify size={24} />
            </a>
            <ModalAddTrack idsong={items.id} playlist={playlist} />
          </div>
        </div>
      </div>
    </>
  );
}
