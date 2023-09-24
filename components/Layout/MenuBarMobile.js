// @/components/Layout/MenuBarMobile.js
import React from "react";
import Link from "next/link";
import { FiMenu as Icon } from "react-icons/fi";
import { useSession } from "next-auth/react";

export default function MenuBarMobile({ setter }) {
  const { data: session } = useSession();

  return (
    <nav className="md:hidden flex justify-between py-2 z-20 fixed top-0 left-0 right-0 [&>*]:my-auto px-2 bg-gradient-to-b from-gray-900 to-transparent">
      <button
        className="text-4xl flex text-white"
        onClick={() => {
          setter((oldVal) => !oldVal);
        }}
      >
        <Icon />
      </button>
      <Link className="text-3xl flex text-white" href="/login">
        <img
          src={session?.user.image}
          alt="Avatar"
          width={42}
          height={42}
          quality={75}
          className="rounded-full"
        />
      </Link>
    </nav>
  );
}
