import Player from "./PlayerComp";
import React, { useState } from "react";
import Head from "next/head";

import MenuBarMobile from "./Layout/MenuBarMobile";
import Sidebar from "./Layout/Sidebar";
import Header from "./Layout/Header";

export default function Layout({ pageTitle, children }) {
  // Concatenate page title (if exists) to site title
  let titleConcat = "Melodify";
  if (pageTitle) titleConcat = titleConcat + " | " + pageTitle;

  // Mobile sidebar visibility state
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/imgs/logo.png" />
        <title>{titleConcat}</title>
      </Head>
      <div className="bg-slate-100 overflow-hidden">
        <Header />
        <div className="flex relative">
          <MenuBarMobile setter={setShowSidebar} />
          <Sidebar show={showSidebar} setter={setShowSidebar} />
          <main className="w-full overflow-y-scroll scrollbar-hide">
            {children}
          </main>
        </div>
        <div className="w-full fixed bottom-0 z-50">
          <Player />
        </div>
      </div>
    </>
  );
}
