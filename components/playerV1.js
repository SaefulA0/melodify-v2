import React from "react";
import { currentTrackIdState } from "../atoms/songAtom";
import { useRecoilState } from "recoil";

export default function PlayerV1() {
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const WIDTH = 420;
  const HEIGHT = 250;

  return (
    <>
      {currentTrackId ? (
        <div className="fixed w-full md:w-fit md:right-0 bottom-0 z-10 flex content-center justify-center md:justify-end md:mr-4">
          <iframe
            src={`https://open.spotify.com/embed/track/${currentTrackId}`}
            width="440"
            height="160"
            allowtransparency="true"
            allow="encrypted-media"
          />
        </div>
      ) : null}
    </>
  );
}
