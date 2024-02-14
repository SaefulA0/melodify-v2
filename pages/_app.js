import Router from "next/router";
import { useState, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import { Flip, ToastContainer } from "react-toastify";
import LoadingComp from "../components/LoadingComp";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Router.events.on("routeChangeStart", (url) => {
      setIsLoading(true);
    });

    Router.events.on("routeChangeComplete", (url) => {
      setIsLoading(false);
    });

    Router.events.on("routeChangeError", (url) => {
      setIsLoading(false);
    });
  }, [Router]);

  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        {isLoading && <LoadingComp />}
        <Component {...pageProps} />
        <ToastContainer transition={Flip} />
      </RecoilRoot>
    </SessionProvider>
  );
}
