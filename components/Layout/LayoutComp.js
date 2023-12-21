import MusicPlayerComp from "../MusicPlayerComp";
import React, { useState } from "react";
import Head from "next/head";

import MenuBarMobile from "./MenuBarMobile";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

export default function LayoutComp({ pageTitle, children }) {
  // Concatenate page title (if exists) to site title
  let titleConcat = "Melodimix";
  if (pageTitle) titleConcat = titleConcat + " | " + pageTitle;

  // Mobile sidebar visibility state
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/imgs/logoSymbol.png" />
        <title>{titleConcat}</title>
      </Head>
      <div className="bg-[#F6F6F6] overflow-hidden">
        <Header />
        <div className="flex relative">
          <MenuBarMobile setter={setShowSidebar} />
          <Sidebar show={showSidebar} setter={setShowSidebar} />
          <main className="w-full h-screen overflow-y-scroll scrollbar-hide">
            {children}
            <Footer />
          </main>
        </div>
        <div>
          {/* <Player /> */}
          <MusicPlayerComp />
        </div>
      </div>
    </>
  );
}
