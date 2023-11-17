import { getSession, useSession } from "next-auth/react";
import LayoutComp from "../components/Layout/LayoutComp";
import { useRouter } from "next/router";
import PlaylistComp from "../components/PlaylistComp";
import useGetTopTracks from "../hooks/useGetTopUserTracks";
import TopTrack from "../components/TopTrackComp";
import Song from "../components/SongComp";
import useGetPlaylistsUser from "../hooks/useGetPlaylistUser";
import useGetTopGlobal from "../hooks/useGetTopGlobal";

export default function Home() {
  const router = useRouter();

  // GET TOP GLOBAL TRACK
  const topGlobalTrack = useGetTopGlobal();

  // GET TOP TRACK USER
  const topTracksUser = useGetTopTracks();

  // GET PLAYLISTS USER
  const playlistsUser = useGetPlaylistsUser();

  return (
    <LayoutComp pageTitle="Home">
      <div className="max-w-full min-h-screen px-2 md:px-8 pt-16 md:pt-12 pb-8 md:flex shadow-sm">
        {/* flex kiri */}
        <div className="md:basis-full md:mr-10">
          {/* home */}
          <h1 className="text-4xl text-gray-800 font-bold mb-4">Beranda</h1>
          <div className="shadow-md rounded-md">
            {/* tranding saat ini */}
            <div className="flex justify-start items-center gap-5 w-full h-32 md:h-52 p-4 md:p-10 rounded-t-md bg-gradient-to-b from-zinc-800 via-zinc-950 to-zinc-800">
              <div className="w-32 md:w-40 flex justify-center items-center">
                <img
                  src={topGlobalTrack?.images?.[0]?.url}
                  width={512}
                  height={512}
                  alt="Playlist Cover"
                  className="rounded-xl"
                />
              </div>
              <div className="mr-2 flex flex-col items-start">
                <h1 className="text-2xl md:text-5xl font-semibold text-slate-100 mb-1 md:mb-3">
                  {topGlobalTrack?.name}
                </h1>
                <p className="text-xs md:text-base text-gray-400">
                  {topGlobalTrack?.description}
                </p>
              </div>
            </div>
            <div className="bg-white px-5 py-6 rounded-b-md">
              <div className="w-full flex justify-between items-center mb-4">
                <h2 className="text-lg text-gray-800 font-bold">
                  Tranding saat ini
                </h2>
                <div
                  onClick={() =>
                    router.push(`/playlistPage/${topGlobalTrack.id}`)
                  }
                  className="text-gray-900 font-medium text-xs opacity-80 hover:opacity-100 cursor-pointer"
                >
                  Lihat Selengkapnya
                </div>
              </div>
              <div className="w-full h-fit">
                <div className="flex flex-col space-y-1 text-gray-500">
                  {topGlobalTrack?.tracks.items.slice(0, 10).map((track, i) => (
                    <Song
                      key={track.id}
                      track={track}
                      order={i}
                      playlist={playlistsUser}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* flex kanan */}
        <div className="md:basis-1/2">
          {/* Top Track */}
          <div className="w-full mt-12 px-5 py-6 text-gray-800 bg-white p-4 rounded-md shadow-md">
            <h2 className="text-lg font-bold">Musik Yang Sering Kamu Dengar</h2>
            {topTracksUser?.items.slice(0, 5).map((items, i) => (
              <TopTrack
                key={items.id}
                items={items}
                playlist={playlistsUser}
                order={i}
              />
            ))}
          </div>
          {/* card playlist */}
          <div className="mt-12">
            <div className="w-full flex justify-between items-center mb-4">
              <h2 className="text-lg text-gray-800 font-bold">
                Daftar Putar Kamu
              </h2>
              <button
                onClick={() => router.push("/playlistPage")}
                className="text-gray-900 font-medium text-xs opacity-80 hover:opacity-100 cursor-pointer"
              >
                Lihat Selengkapnya
              </button>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              {playlistsUser.slice(0, 4).map((playlist) => (
                <PlaylistComp key={playlist.id} playlist={playlist} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </LayoutComp>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/landingPage",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
