import React from "react";
import useGetTopTrack from "@/hooks/useGetTop";
import TopTrack from "./TopTrack";

export default function TopTracks() {
  const getTopTrack = useGetTopTrack();

  return (
    <>
      {getTopTrack?.items.slice(0, 5).map((items, i) => (
        <TopTrack key={items.id} items={items} order={i} />
      ))}
    </>
  );
}
