import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyAPI = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

export default function useSpotify() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      // if referesh token attempt fails, direct user to signIn page
      if (session.error === "RefreshAccessTokenError") {
        signIn();
      }

      spotifyAPI.setAccessToken(session.user.accessToken);
      // console.log("TOKEN YANG DIPAKE REQ", session.user.accessToken);
    }
  }, [session]);

  return spotifyAPI;
}
