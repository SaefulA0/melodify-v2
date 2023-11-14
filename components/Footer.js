import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="flex flex-col items-center text-center text-white">
        <div className="w-full p-4 text-center bg-gray-900">
          © 2023 Copyright -
          <a className="text-white" href="https://tw-elements.com/">
            {" "}
            Melodify
          </a>
        </div>
      </footer>
    </>
  );
}
