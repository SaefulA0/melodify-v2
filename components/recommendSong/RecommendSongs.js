import React from "react";
import RecommendSong from "./RecommendSong";

export default function RecommendSongs({ track }) {
  return (
    <>
      <div className="w-full h-fit flex flex-col space-y-1 text-gray-500 mb-20">
        {track?.slice(0, 10).map((track, i) => (
          <RecommendSong key={i} track={track} order={i} />
        ))}
      </div>
    </>
  );
}
