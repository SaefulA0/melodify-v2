// @/components/Layout/MenuBarMobile.js
import React from "react";
import { BiSolidChevronsRight } from "react-icons/bi";

export default function MenuBarMobile({ setter }) {
  return (
    <nav className="md:hidden rounded-r-full flex justify-start items-center py-2 z-20 fixed top-3 left-0 [&>*]:my-auto px-2 bg-gradient-to-b from-gray-900 to-gray-800">
      <button
        className="text-4xl flex text-white"
        onClick={() => {
          setter((oldVal) => !oldVal);
        }}
      >
        <BiSolidChevronsRight size={24} />
      </button>
    </nav>
  );
}
