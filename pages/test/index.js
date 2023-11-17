import React, { useState } from "react";
import LayoutComp from "../../components/Layout/LayoutComp";
import { getSession } from "next-auth/react";
import TestComp1 from "../../components/test/TestComp1";

export default function Test() {
  return (
    <LayoutComp pageTitle="Test">
      <div className="max-w-full min-h-screen pt-14 px-8 text-gray-800 ">
        {/* main */}
        <h3 className="text-4xl text-gray-900 font-bold mb-10">
          Dapatkan Rekomendasi
        </h3>
        <TestComp1 />
      </div>
    </LayoutComp>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/landingPage",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
