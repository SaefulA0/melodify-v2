import React from "react";
import { DotLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="absolute top-0 left-0 w-full min-h-screen backdrop-blur-sm flex flex-col justify-center items-center z-50">
      <DotLoader className="" color="#36d7b7" />
    </div>
  );
}
