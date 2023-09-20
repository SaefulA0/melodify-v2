import Player from "./Player";
import React, { useState } from "react";
import Head from "next/head";

import MenuBarMobile from "./LayoutTest/MenuBarMobile";
import Sidebar from "./LayoutTest/Sidebar";
import Header from "./LayoutTest/Header";

export default function Layout({ pageTitle, children }) {
  // Concatenate page title (if exists) to site title
  let titleConcat = "Melodify";
  if (pageTitle) titleConcat = pageTitle + " | " + titleConcat;

  // Mobile sidebar visibility state
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <Head>
        <title>{titleConcat}</title>
      </Head>
      <div className="bg-slate-100 overflow-hidden">
        {/* <Header /> */}
        <div className="flex relative">
          <MenuBarMobile setter={setShowSidebar} />
          <Sidebar show={showSidebar} setter={setShowSidebar} />
          <main className="w-full overflow-y-scroll">{children}</main>
        </div>
        <div className="w-full fixed bottom-0 z-50">
          <Player />
        </div>
      </div>
    </>
  );
}
