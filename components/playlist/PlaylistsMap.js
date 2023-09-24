import PlaylistCom from "./PlaylistCom";
import React from "react";

export default function PlaylistsMap({ playlist }) {
  console.log(playlist);
  return (
    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
      {playlist.map((playlist, i) => (
        <PlaylistCom key={i} playlist={playlist} />
      ))}
    </div>
  );
}
