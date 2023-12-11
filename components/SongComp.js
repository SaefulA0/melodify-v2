import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import React, { useState } from "react";
import { LiaSpotify } from "react-icons/lia";
import ModalAddTrack from "./Modals/ModalAddTrack";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function SongComp({
  order,
  track,
  playlist,
  spotifyAPI,
  length,
  modelComponent,
  playlistId,
}) {
  const router = useRouter();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const componentLength = length;

  const playSong = () => {
    setCurrentTrackId(track.id);
  };

  const successToast = () =>
    toast("Musik berhasil ditambah", {
      hideProgressBar: false,
      autoClose: 2000,
      type: "success",
      position: "bottom-left",
      closeOnClick: true,
      draggable: true,
      theme: "light",
    });

  const failToast = () =>
    toast("Musik gagal ditambah", {
      hideProgressBar: false,
      autoClose: 2000,
      type: "error",
      position: "bottom-left",
      closeOnClick: true,
      draggable: true,
      theme: "light",
    });

  // ADD TRACK TO A PLAYLIST
  const HandleAddTrack = () => {
    if (spotifyAPI.getAccessToken()) {
      spotifyAPI
        .addTracksToPlaylist(`${playlistId}`, [`spotify:track:${track.id}`])
        .then((data) => {
          successToast();
          setTimeout(() => {
            router.reload();
          }, 1800);
        })
        .catch((err) => {
          failToast();
        });
    }
  };

  return (
    <>
      <div
        onClick={playSong}
        className="grid grid-cols-2 py-2 md:py-4 px-2 md:px-6 rounded-lg cursor-pointer delay-100 hover:bg-gray-200 duration-300 border-b"
      >
        <div className="flex items-center space-x-4">
          <p>{order + 1}</p>
          <img
            className="w-10 h-10 rounded-lg"
            src={track.album.images[0].url}
            alt="Album Img"
          />
          <div className="w-full lg:w-44">
            <p className="truncate text-gray-900 font-semibold">{track.name}</p>
            <p className="truncate">{track.artists[0].name}</p>
          </div>
        </div>
        <div className="flex items-center justify-between ml-auto md:ml-0">
          {componentLength ? (
            <p className="hidden md:inline truncate">{track.album.name}</p>
          ) : (
            <p className="hidden md:inline truncate"> </p>
          )}
          {modelComponent == "Model1" && (
            <div className="flex">
              <a
                href={track.external_urls.spotify}
                target="_blank"
                className="flex gap-1 text-gray-700 w-full items-center cursor-pointer text-sm rounded-b-md px-2 py-3 hover:bg-gray-400 hover:bg-opacity-20 rounded-md"
              >
                <LiaSpotify size={24} />
              </a>
              <ModalAddTrack
                idsong={track.id}
                playlist={playlist}
                spotifyAPI={spotifyAPI}
              />
            </div>
          )}
          {modelComponent == "Model2" && (
            <button
              onClick={HandleAddTrack}
              className="flex gap-1 text-gray-700 items-center cursor-pointer text-sm px-2 py-3 hover:bg-gray-400 hover:bg-opacity-20 rounded-md"
            >
              <MdOutlinePlaylistAdd size={24} />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
