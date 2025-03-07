import { signOut, useSession } from "next-auth/react";
import React from "react";

export default function HeaderComp() {
  const { data: session } = useSession();

  return (
    <>
      <div className="hidden md:block fixed top-8 right-8 z-10">
        {/* Avatar */}
        <button
          className="bg-gradient-to-l from-zinc-700 via-zinc-900 to-zinc-900 flex items-center py-1.5 px-3 w-fit rounded-full cursor-pointer shadow-lg"
          onClick={() => signOut()}
        >
          <img
            src={session?.user.image}
            alt="Avatar"
            width={42}
            height={42}
            quality={75}
            className="rounded-full"
          />
          <h2 className="w-32 truncate text-gray-300 text-center">
            {session?.user.name}
          </h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 stroke-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
