import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { toast } from "react-toastify";

import useSpotify from "../../hooks/useSpotify";

export default function ModalSavePlaylist({ idPlaylist }) {
  const [visibility, setVisibility] = useState(false);

  let [isOpen, setIsOpen] = useState(false);

  const spotifyAPI = useSpotify();

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  const successToast = () =>
    toast("Daftar putar musik berhasil disimpan", {
      hideProgressBar: false,
      autoClose: 2000,
      type: "success",
      position: "bottom-left",
      closeOnClick: true,
      draggable: true,
      theme: "light",
    });

  const failToast = () =>
    toast("Daftar putar musik gagal disimpan", {
      hideProgressBar: false,
      autoClose: 2000,
      type: "error",
      position: "bottom-left",
      closeOnClick: true,
      draggable: true,
      theme: "light",
    });

  // ADD PLAYLIST TO A LIBRARY
  const HandleSavePlaylist = () => {
    if (spotifyAPI.getAccessToken()) {
      spotifyAPI
        .followPlaylist(`${idPlaylist}`, {
          public: false,
        })
        .then((data) => {
          successToast();
          console.log("BENER ", data);
        })
        .catch((err) => {
          failToast();
          console.log("ADA YANG SALAH ", err);
        });
    }
  };

  return (
    <>
      <button
        onClick={HandleSavePlaylist}
        className="absolute right-5 top-5 w-fit flex flex-row gap-2 py-2 px-4 bg-gray-800 text-sm rounded-md"
      >
        <MdOutlinePlaylistAdd size={24} />
        Simpan
      </button>
    </>
  );
}
