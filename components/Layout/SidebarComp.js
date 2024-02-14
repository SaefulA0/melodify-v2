// @/components/Layout/Sidebar.js
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

import { AiOutlineHome, AiOutlineHeart } from "react-icons/ai";
import { MdOutlineLibraryMusic } from "react-icons/md";
import { signOut, useSession } from "next-auth/react";
import { BiLogIn } from "react-icons/bi";

export default function SidebarComp({ show, setter }) {
  const router = useRouter();
  const { data: session } = useSession();

  // Define our base class
  const className =
    "h-screen bg-[#252525] md:flex md:flex-col md:justify-start md:items-start w-[250px] transition-[margin-left] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0 z-40";
  // Append class based on state of sidebar visiblity
  const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";

  // Clickable menu items
  const MenuItem = ({ icon, name, route }) => {
    // Highlight menu item based on currently displayed route
    const colorClass =
      router.pathname === route
        ? "text-gray-900 font-bold bg-[#F6F6F6]"
        : "text-gray-400 hover:text-gray-700 transition ease-in-out hover:bg-[#F6F6F6] hover:-translate-y-1 duration-300";

    return (
      <Link
        href={route}
        onClick={() => {
          setter((oldVal) => !oldVal);
        }}
        className={`w-full py-3 flex items-center mb-4 rounded-l-none md:rounded-l-md ${colorClass}`}
      >
        <div className="text-lg flex [&>*]:mx-auto w-[50px] mr-2 md:mr-0">
          {icon}
        </div>
        <div className="text-sm truncate w-full">{name}</div>
      </Link>
    );
  };

  // Overlay to prevent clicks in background, also serves as our close button
  const ModalOverlay = () => (
    <div
      className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30`}
      onClick={() => {
        setter((oldVal) => !oldVal);
      }}
    />
  );

  return (
    <>
      <div className={`${className}${appendClass}`}>
        <div className="py-10 w-full flex flex-coll justify-center">
          <Link href="/">
            <Image
              src="/imgs/logoSymbol.png"
              alt="logo"
              width={128}
              height={128}
              priority={true}
              className="rounded-xl shadow-lg"
            />
          </Link>
        </div>

        <div className="flex flex-col justify-center w-full pl-0 md:pl-4">
          <MenuItem
            name="Beranda"
            route="/"
            icon={<AiOutlineHome size={24} />}
          />
          <MenuItem
            name="Daftar Putar"
            route="/playlistPage"
            icon={<MdOutlineLibraryMusic size={24} />}
          />
          <MenuItem
            name="Rekomendasi"
            route="/recommendationsPage"
            icon={<AiOutlineHeart size={24} />}
          />
        </div>
        <div className="absolute md:hidden bottom-0 flex justify-between w-full bg-gray-950">
          <div className="flex items-center gap-2 p-4">
            <img
              src={session?.user.image}
              alt="Avatar"
              width={32}
              height={32}
              className="rounded-md ring ring-white"
            />
            <p className="w-32 text-gray-300 truncate">{session?.user.name}</p>
          </div>
          <button
            onClick={() => signOut()}
            className="px-2 flex items-center justify-start bg-red-600 hover:bg-red-700"
          >
            <BiLogIn size={24} />
          </button>
        </div>
      </div>
      {show ? <ModalOverlay /> : <></>}
    </>
  );
}
