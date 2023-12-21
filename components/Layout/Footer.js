import React from "react";

export default function Footer() {
  return (
    <>
      <footer class="text-slate-400">
        <div class="bg-gradient-to-r from-[#252525] via-zinc-800 to-zinc-700">
          <div class="relative container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
            <p>
              Powered By{" "}
              <span className="font-bold text-slate-300">Spotify</span>
            </p>
            <span class="inline-flex sm:ml-auto sm:mr-10 mr-0 sm:mt-0 mt-4 justify-center sm:justify-start">
              <p class="text-sm sm:mt-0 mt-4">© 2023 Copyright - Melodimix</p>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
