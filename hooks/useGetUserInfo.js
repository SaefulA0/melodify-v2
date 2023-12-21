import { useEffect, useState } from "react";

export default function useGetUserInfo({ spotifyAPI }) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (spotifyAPI.getAccessToken()) {
      spotifyAPI.getMe().then((data) => {
        setUserInfo(data.body);
      });
    }
  }, [spotifyAPI]);

  return userInfo;
}
