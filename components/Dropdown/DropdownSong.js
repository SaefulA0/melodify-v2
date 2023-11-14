import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import { LiaSpotify } from "react-icons/lia";
import { MdOutlinePlaylistAdd } from "react-icons/md";

export default function DropdownSong({ openSpotify, idSong }) {
  return (
    <>
      <Menu as="div" className="relative w-fit">
        <Menu.Button>
          <div className="mx-auto px-3 py-2 flex items-center rounded-lg text-sm">
            <HiOutlineEllipsisVertical size={24} />
          </div>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Menu.Items className="absolute z-10 w-52 mt-1 right-0 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              <button className="flex gap-1 text-gray-700 w-full items-center cursor-pointer text-sm px-2 py-3 hover:bg-gray-400 hover:bg-opacity-20">
                <MdOutlinePlaylistAdd size={24} />
                Tambah Ke Daftar Putar
              </button>
            </Menu.Item>
            <Menu.Item>
              <a
                href={openSpotify}
                target="_blank"
                className="flex gap-1 text-gray-700 w-full items-center cursor-pointer text-sm rounded-b-md px-2 py-3 hover:bg-gray-400 hover:bg-opacity-20"
              >
                <LiaSpotify size={24} />
                Putar Di Spotify
              </a>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}
