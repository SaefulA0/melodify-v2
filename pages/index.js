import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
// COMPONENTS
import LayoutComp from "../components/Layout/LayoutComp";
import PlaylistComp from "../components/PlaylistComp";
import SongComp from "../components/SongComp";
// CUSTOM HOOKS
import useGetUserTopTracks from "../hooks/useGetUserTopTracks";
import useGetUserPlaylists from "../hooks/useGetUserPlaylists";
import useSpotify from "../hooks/useSpotify";
import useGetUserInfo from "../hooks/useGetUserInfo";
import useSelectedPlaylist from "../hooks/useGetPlaylist";

export default function HomePage() {
  const router = useRouter();

  // GET ACCESSTOKEN
  const spotifyAPI = useSpotify();

  // GET TOP GLOBAL TRACK
  const playlistId = "37i9dQZEVXbMDoHDwVN2tF";
  const topGlobalTrack = useSelectedPlaylist({
    spotifyAPI,
    playlistId,
  });

  // GET USER INFO
  const userInfo = useGetUserInfo({ spotifyAPI });
  const userId = userInfo?.id;

  // GET TOP TRACK USER
  const userTopTracks = useGetUserTopTracks({ spotifyAPI });

  // GET PLAYLISTS USER
  const userPlaylists = useGetUserPlaylists({ spotifyAPI, userId });

  return (
    <LayoutComp pageTitle="Home">
      <div className="min-h-screen max-w-full px-6 pt-16 md:pt-11 md:flex shadow-sm rounded-l-3xl mb-16">
        {/* flex kiri */}
        <div className="md:basis-full md:mr-10">
          {/* home */}
          <h1 className="text-4xl text-gray-800 font-bold mb-4">Beranda</h1>
          <div className="shadow-md rounded-md">
            {/* tranding saat ini */}
            <div className="flex justify-start items-center gap-5 w-full h-32 md:h-52 p-4 md:p-10 rounded-t-md bg-gradient-to-b from-zinc-800 via-zinc-950 to-zinc-800">
              <div className="w-32 md:w-40 flex justify-center items-center">
                {topGlobalTrack?.images?.[0]?.url ? (
                  <img
                    className="rounded-md aspect-square object-cover w-full mb-1"
                    src={topGlobalTrack?.images?.[0]?.url}
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
                  Tranding Musik Saat Ini
                </h2>
                <div
                  onClick={() =>
                    router.push(`/playlistPage/${topGlobalTrack.id}`)
                  }
                  className="text-gray-900 font-medium text-xs opacity-80 hover:opacity-100 cursor-pointer"
                >
                  Lihat selengkapnya
                </div>
              </div>
              <div className="w-full h-fit">
                <div className="flex flex-col space-y-1 text-gray-500">
                  {topGlobalTrack?.tracks.items.slice(0, 10).map((track, i) => (
                    <SongComp
                      key={track.track.id}
                      track={track.track}
                      order={i}
                      playlist={userPlaylists}
                      spotifyAPI={spotifyAPI}
                      length={true}
                      modelComponent={"Model1"}
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
            <h2 className="text-lg font-bold">Musik Yang Sering Kamu Putar</h2>
            {userTopTracks?.items.slice(0, 5).map((items, i) => (
              <SongComp
                key={items.id}
                track={items}
                playlist={userPlaylists}
                order={i}
                spotifyAPI={spotifyAPI}
                length={false}
                modelComponent={"Model1"}
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
                Lihat selengkapnya
              </button>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              {userPlaylists?.items?.slice(0, 4).map((playlist) => (
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
