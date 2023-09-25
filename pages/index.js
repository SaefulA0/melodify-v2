import { getSession, useSession } from "next-auth/react";
import Layout from "@/components/LayoutComp";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { playlistState } from "@/atoms/playlistAtom";

import useSpotify from "@/hooks/useSpotify";
import { useRouter } from "next/router";
import PlaylistComp from "@/components/PlaylistComp";
import useGetTopTrack from "@/hooks/useGetTop";
import TopTrack from "@/components/TopTrackComp";
import Song from "@/components/SongComp";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  const [topTrackGlobal, setTopTrackGlobal] = useRecoilState(playlistState);
  const [playlistsUser, setPlaylistsUser] = useState([]);

  const spotifyAPI = useSpotify();

  // GET TOP TRACK GLOBAL
  useEffect(() => {
    spotifyAPI
      .getPlaylist("37i9dQZEVXbMDoHDwVN2tF")
      .then((data) => {
        setTopTrackGlobal(data.body);
        // console.log("Some information about this playlist", data.body);
      })
      .catch((err) => console.log("Something went wrong!", err));
  }, [spotifyAPI]);

  // GET PLAYLISTS USER
  useEffect(() => {
    if (spotifyAPI.getAccessToken()) {
      spotifyAPI.getUserPlaylists({ limit: 4 }).then((data) => {
        setPlaylistsUser(data.body.items);
      });
    }
  }, [session, spotifyAPI]);

  // GET TOP TRACK USER
  const getTopTrack = useGetTopTrack();

  return (
    <Layout pageTitle="Home">
      <div className="max-w-full p-8 pt-11 md:flex bg-[#F4F5FC] border shadow-sm">
        {/* flex kiri */}
        <div className="md:basis-full md:mr-10">
          {/* home */}
          <div className="md:mb-10">
            <h1 className="text-4xl text-gray-700 font-bold mb-4">Beranda</h1>
            {/* <MusicRecommendation /> */}
            <div className="flex gap-5 w-full h-32 md:h-52 mb-5 p-4 md:p-10 bg-gradient-to-t from-gray-500 to-gray-900 rounded-md">
              <div className="w-24 md:w-40 flex justify-center items-center">
                <img
                  src={topTrackGlobal?.images?.[0]?.url}
                  width={512}
                  height={512}
                  alt="Playlist Cover"
                />
              </div>
              <div className="mr-2 flex flex-col items-start">
                <h1 className="text-5xl font-semibold text-slate-100 mb-3">
                  {topTrackGlobal?.name}
                </h1>
                <p>{topTrackGlobal?.description}</p>
              </div>
            </div>
          </div>
          {/* tranding saat ini */}
          <div className="">
            <div className="w-full flex justify-between items-center mb-4">
              <h2 className="text-lg text-gray-700 font-bold">
                Tranding saat ini
              </h2>
              <div
                onClick={() =>
                  router.push(`/playlistPage/${topTrackGlobal.id}`)
                }
                className="text-gray-900 font-medium text-xs opacity-80 hover:opacity-100 cursor-pointer"
              >
                See More
              </div>
            </div>
            <div className="w-full h-fit pb-20">
              <div className="flex flex-col space-y-1 text-gray-500">
                {topTrackGlobal?.tracks.items.slice(0, 10).map((track, i) => (
                  <Song key={track.track.id} track={track} order={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* flex kanan */}
        <div className="md:basis-1/2">
          {/* Top Track */}
          <div className="mt-12 text-gray-700">
            <h2 className="text-lg font-bold mb-4">
              Musik Yang Sering Kamu Dengar
            </h2>
            {getTopTrack?.items.slice(0, 5).map((items, i) => (
              <TopTrack key={items.id} items={items} order={i} />
            ))}
          </div>
          {/* card playlist */}
          <div className="mt-12">
            <div className="w-full flex justify-between items-center mb-4">
              <h2 className="text-lg text-gray-700 font-bold">
                Daftar Putar Kamu
              </h2>
              <button
                onClick={() => router.push("/playlistPage")}
                className="text-gray-900 font-medium text-xs opacity-80 hover:opacity-100 cursor-pointer"
              >
                See More
              </button>
            </div>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {playlistsUser.map((playlist, i) => (
                <PlaylistComp key={i} playlist={playlist} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
