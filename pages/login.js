import React, { useEffect } from "react";
import { getProviders, signIn, useSession } from "next-auth/react";
import Router from "next/router";

function Login({ providers }) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") Router.replace("/");
  }, [status]);

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-black">
      <img
        className="w-52 mb-5"
        src="https://links.papareact.com/9xl"
        alt="Spotify Logo"
      />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-[#18D860] text-white p-5 rounded-lg"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
