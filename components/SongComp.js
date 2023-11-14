import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify";
import React from "react";
import { LiaSpotify } from "react-icons/lia";
import ModalAddTrack from "./Modals/ModalAddTrack";

function Song({ order, track, playlist }) {
  // const spotifyAPI = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(track.track.id);
    setIsPlaying(true);
    // spotifyAPI.play({
    //   uris: [track.track.uri],
    // });
  };

  return (
    <>
      <div
        className="grid grid-cols-2 py-2 md:py-4 px-2 md:px-6 rounded-lg cursor-pointer delay-100 hover:bg-gray-200 duration-300"
        onClick={playSong}
      >
        <div className="flex items-center space-x-4">
          <p>{order + 1}</p>
          <img
            className="w-10 h-10 rounded-lg"
            src={track.track.album.images[0].url}
            alt="Album Img"
          />
          <div className="w-full lg:w-64">
            <p className="truncate text-gray-900 font-semibold">
              {track.track.name}
            </p>
            <p className="truncate">{track.track.artists[0].name}</p>
          </div>
        </div>
        <div className="flex items-center justify-between ml-auto md:ml-0">
          <p className="hidden md:inline">
            {track.track.album.name}
            {/* {millisToMinutesAndSeconds(track.track.duration_ms)} */}
          </p>
          <div className="flex">
            <a
              href={track.track.external_urls.spotify}
              target="_blank"
              className="flex gap-1 text-gray-700 w-full items-center cursor-pointer text-sm rounded-b-md px-2 py-3 hover:bg-gray-400 hover:bg-opacity-20"
            >
              <LiaSpotify size={24} />
            </a>
            <ModalAddTrack idsong={track.track.id} playlist={playlist} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Song;
