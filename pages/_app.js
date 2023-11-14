import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

import { Flip, ToastContainer } from "react-toastify";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
        <ToastContainer transition={Flip} />
      </RecoilRoot>
    </SessionProvider>
  );
}
