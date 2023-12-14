import { useEffect, useState } from "react";

export default function useGetUserInfo({ spotifyAPI }) {
  const [getUserInfo, setGetUserInfo] = useState(null);

  useEffect(() => {
    if (spotifyAPI.getAccessToken()) {
      spotifyAPI.getMe().then((data) => {
        setGetUserInfo(data.body);
      });
    }
  }, [spotifyAPI]);

  return getUserInfo;
}
