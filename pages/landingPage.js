import React from "react";
import { getProviders, getSession, signIn } from "next-auth/react";
import Head from "next/head";
import Footer from "../components/Layout/Footer";

export default function landingPage({ providers }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/imgs/logoSymbol.png" />
        <title>Melodify | Landing Page</title>
      </Head>
      <main className="bg-cover bg-no-repeat bg-left bg-landingPageBG">
        <div className="relative min-w-full min-h-screen flex flex-col justify-center items-center bg-gray-100 bg-opacity-80">
          <section className="text-gray-600 body-font">
            <div className="container mx-auto flex md:flex-row flex-col items-center scrollbar-hide">
              <div className="relative h-screen lg:flex-grow md:w-1/2 px-6 lg:px-24 md:px-16 flex flex-col justify-center items-center md:items-start text-center md:text-left mb-16 md:mb-0 ">
                <header className="absolute w-full top-0 left-0 right-0 text-gray-600 body-font p-4">
                  <div className="container mx-auto flex flex-wrap p-2 flex-row items-center justify-between">
                    <img
                      className="w-24 md:w-32 rounded-md shadow-md"
                      width={500}
                      height={500}
                      src="https://i.ibb.co/3MhHYZ9/Logotype.png"
                      alt="logoType"
                    />
                  </div>
                </header>
                <h1 className="title-font md:text-6xl text-3xl mb-4 font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 via-black to-gray-600">
                  Melodi mengungkapkan <br className="hidden lg:inline-block" />
                  apa yang tidak bisa diucapkan.
                </h1>
                <p className="mb-8 leading-relaxed text-base">
                  Dengarkan musik favoritmu dan temukan musik yang sesuai dengan
                  moodmu disini!
                </p>
                <div className="flex justify-center">
                  {Object.values(providers).map((provider) => (
                    <div key={provider.name}>
                      <button
                        className="inline-flex text-white bg-gradient-to-tl from-gray-700 via-[#252525] to-gray-800 cursor-pointer transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-300 border-0 py-2.5 px-11 focus:outline-none rounded-md text-lg shadow-md"
                        onClick={() =>
                          signIn(provider.id, { callbackUrl: "/" })
                        }
                      >
                        Masuk Dengan Spotify
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 h-full">
                <img
                  className="hidden md:inline object-cover object-center rounded"
                  alt="Hero"
                  src="https://i.ibb.co/2S99vKG/Landing-Page-BG.jpg"
                />
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      providers,
    },
  };
}
