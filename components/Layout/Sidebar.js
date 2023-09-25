// @/components/Layout/Sidebar.js
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

import { AiOutlineHome, AiOutlineHeart } from "react-icons/ai";
import { MdOutlineLibraryMusic } from "react-icons/md";

export default function Sidebar({ show, setter }) {
  const router = useRouter();

  // Define our base class
  const className =
    "bg-gray-100 border-r md:flex md:flex-col md:justify-start md:items-start w-[250px] transition-[margin-left] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0 z-40";
  // Append class based on state of sidebar visiblity
  const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";

  // Clickable menu items
  const MenuItem = ({ icon, name, route }) => {
    // Highlight menu item based on currently displayed route
    const colorClass =
      router.pathname === route
        ? "text-gray-900 font-bold bg-gradient-to-r to-gray-100 from-gray-300 border-l-2 border-gray-800"
        : "text-gray-500 hover:text-gray-700 transition ease-in-out hover:bg-gray-200 hover:-translate-y-1 duration-300";

    return (
      <Link
        href={route}
        onClick={() => {
          setter((oldVal) => !oldVal);
        }}
        className={`w-full py-3 flex items-center rounded-r-lg mb-4 ${colorClass}`}
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
              src="/imgs/logo.png"
              alt="logo"
              width={128}
              height={128}
              priority={true}
            />
          </Link>
        </div>
        {/* <div className="w-full flex flex-col justify-center items-center py-10 px-3">
          <img
            src={session?.user.image}
            alt="Avatar"
            width={64}
            height={64}
            quality={75}
            className="rounded-full"
          />
          <h2 className="w-32 truncate mt-3 text-gray-900 text-center font-bold">
            {session?.user.name}
          </h2>
        </div> */}
        <div className="flex flex-col justify-center w-full">
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
      </div>
      {show ? <ModalOverlay /> : <></>}
    </>
  );
}
