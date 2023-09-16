import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "@/atoms/songAtom";
import useSpotify from "@/hooks/useSpotify";
import { millisToMinutesAndSeconds } from "@/lib/time";
import React from "react";

function Song({ order, track }) {
  const spotifyAPI = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(track.track.id);
    setIsPlaying(true);
    spotifyAPI.play({
      uris: [track.track.uri],
    });

    // spotifyAPI.play().then(
    //   function () {
    //     console.log("Playback started");
    //   },
    //   function (err) {
    //     //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
    //     console.log("Something went wrong!", err);
    //   }
    // );

    // if (track.track.id === currentTrackId) {
    //   if (isPlaying) {
    //     await spotifyAPI.pause();
    //     setIsPlaying(false);
    //   } else {
    //     await spotifyAPI.play();
    //     setIsPlaying(true);
    //   }
    // } else {
    //   await spotifyAPI.play({ uris: [track.track.uri] });
    //   setcurrentStrackId(track.track.id);
    //   setIsPlaying(true);
    // }
  };

  return (
    <div
      className="grid grid-cols-2 py-4 px-6 rounded-lg hover:bg-gray-200 cursor-pointer"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img
          className="w-10 h-10"
          src={track.track.album.images[0].url}
          alt="Album Img"
        />
        <div>
          <p className="w-32 lg:w-64 truncate text-gray-900 font-semibold">
            {track.track.name}
          </p>
          <p className="w-32 lg:w-64 truncate">{track.track.artists[0].name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-64 truncate hidden md:inline">
          {track.track.album.name}
        </p>
        <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  );
}

export default Song;
