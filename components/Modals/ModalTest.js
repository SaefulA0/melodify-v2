import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-toastify";
import { MdOutlinePlaylistAdd } from "react-icons/md";

import useSpotify from "../../hooks/useSpotify";
import { useRouter } from "next/router";

export default function ModalTest() {
  const router = useRouter();
  const [titlePlaylist, setTitlePlaylist] = useState("");
  const [descriptionPlaylist, setDescriptionPlaylist] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [message, setMessage] = useState("");

  let [isOpen, setIsOpen] = useState(false);

  const spotifyAPI = useSpotify();

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  const successToast = () =>
    toast("Daftar Putar Musik berhasil dibuat", {
      hideProgressBar: false,
      autoClose: 2000,
      type: "success",
      position: "bottom-left",
      closeOnClick: true,
      draggable: true,
      theme: "light",
    });

  const failToast = () =>
    toast("Daftar Putar Musik gagal dibuat", {
      hideProgressBar: false,
      autoClose: 2000,
      type: "error",
      position: "bottom-left",
      closeOnClick: true,
      draggable: true,
      theme: "light",
    });

  // CREATE A PLAYLIST
  const HandleCreatePlaylist = () => {
    if (spotifyAPI.getAccessToken()) {
      spotifyAPI
        .createPlaylist(`${titlePlaylist}`, {
          description: `${descriptionPlaylist}`,
          public: `${visibility}`,
        })
        .then((data) => {
          console.log("Playlist berhasil ditambah");
          closeModal();
          successToast();
          setTimeout(() => {
            router.reload();
          }, 2100);
        })
        .catch((err) => {
          message("bzzzz");
          console.log("Playlist gagal ditambah");
          failToast();
        });
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className="flex gap-1 text-gray-700 items-center cursor-pointer text-sm px-2 py-3 hover:bg-gray-400 hover:bg-opacity-20"
      >
        <MdOutlinePlaylistAdd size={24} />
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold leading-6 text-gray-900"
                  >
                    Buat Daftar Putar | {titlePlaylist} | {descriptionPlaylist}{" "}
                    | {visibility}
                  </Dialog.Title>
                  {/* Input Field */}
                  <div className="mt-8 mb-10">
                    {/* set title playlist */}
                    <div className="relative mb-4">
                      <label
                        htmlFor="title_playlist"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Nama Daftar Putar
                      </label>
                      <input
                        type="text"
                        id="title_playlist"
                        className="text-gray-900 mt-1 block w-full pl-3 pr-10 py-2 text-base transform duration-300 focus:outline-none ring-2 ring-gray-300 focus:ring-blue-400 sm:text-sm rounded-sm shadow-md"
                        placeholder="Masukan nama daftar putar"
                        value={titlePlaylist}
                        onChange={(e) => setTitlePlaylist(e.target.value)}
                        required
                      />
                    </div>
                    {/* set desc playlist */}
                    <div className="relative mb-4">
                      <label
                        htmlFor="desc_playlist"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Deskripsi Daftar Putar
                      </label>
                      <textarea
                        rows="4"
                        id="desc_playlist"
                        className="text-gray-900 mt-1 block w-full pl-3 pr-10 py-2 text-base transform duration-300 focus:outline-none ring-2 ring-gray-300 focus:ring-blue-400 sm:text-sm rounded-sm shadow-md"
                        placeholder="Tambahkan deskripsi opsional"
                        value={descriptionPlaylist}
                        onChange={(e) => setDescriptionPlaylist(e.target.value)}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="visibility"
                        className="block text-sm font-medium text-gray-900 mb-2"
                      >
                        Privasi
                      </label>
                      <select
                        id="visibility"
                        name="visibility"
                        className="text-gray-900 mt-1 block w-full transform duration-300 pl-3 pr-10 py-2 text-base focus:outline-none ring-2 ring-gray-300 focus:ring-blue-400 sm:text-sm rounded-sm shadow-md"
                        defaultValue={visibility}
                        onChange={(e) => setVisibility(e.target.value)}
                      >
                        <option selected value={true}>
                          Publik
                        </option>
                        <option value={false}>Privat</option>
                      </select>
                    </div>
                  </div>
                  <div className="w-full flex justify-end gap-4 mt-4">
                    <button
                      type="button"
                      className="w-28 inline-flex justify-center rounded-md shadow-md border border-gray-300 bg-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Tutup
                    </button>
                    <button
                      onClick={HandleCreatePlaylist}
                      className="w-28 inline-flex justify-center rounded-md shadow-md border border-gray-900 bg-gray-800 hover:bg-gray-800 px-4 py-2 text-sm font-medium text-slate-100  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Buat
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
