import { useRouter } from "next/router";
import React from "react";

export default function PlaylistComp({ playlist }) {
  const router = useRouter();

  return (
    <div onClick={() => router.push(`/playlistPage/${playlist.id}`)}>
      <div className="w-36 md:w-44 h-56 md:h-60 shadow-lg p-2 rounded-md border cursor-pointer transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 bg-white hover:bg-gray-200 duration-300 hover:z-20">
        {playlist.images[0] ? (
          <img
            className="rounded-md aspect-square object-cover w-full mb-1"
            src={playlist.images?.[0]?.url}
            width={128}
            height={128}
            alt="Album Image"
          />
        ) : (
          <img
            className="rounded-md aspect-square object-cover w-full mb-1"
            src="/imgs/albumCover.png"
            width={128}
            height={128}
            alt="Album Image"
          />
        )}
        <h3 className="text-base font-semibold truncate text-gray-800 mb-1">
          {playlist.name}
        </h3>
        <p className="text-sm font-normal text-gray-600 text-opacity-50 truncate mb-2">
          {playlist.description}
        </p>
      </div>
    </div>
  );
}
