import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
  // images
  // "ugc-image-upload",

  // Spotify Connect
  // "user-read-playback-state",
  // "user-modify-playback-state",
  // "user-read-currently-playing",

  // Playback
  // "app-remote-control",
  // "streaming",

  // Playlists
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-private",
  "playlist-modify-public",

  // Follow
  "user-follow-modify",
  "user-follow-read",

  // Listening History
  // "user-read-playback-position",
  "user-top-read",
  // "user-read-recently-played",

  // Library
  // "user-library-modify",
  // "user-library-read",

  // Users
  "user-read-email",
  "user-read-private",
].join(", ");

const params = {
  scope: scopes,
};

const querryParamString = new URLSearchParams(params);

const LOGIN_URL =
  "https://accounts.spotify.com/authorize?" + querryParamString.toString();

const spotifyAPI = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
  redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI,
});

export default spotifyAPI;

export { LOGIN_URL };
