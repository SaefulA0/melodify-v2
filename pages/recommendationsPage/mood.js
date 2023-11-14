import React, { useRef, useState } from "react";
import { getSession } from "next-auth/react";

import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import {
  currentMoodState,
  selectedGenreState,
} from "../../atoms/recommendationsAtom";
import useGetAvailableGenre from "../../hooks/useGetAvailableGenre";

import Layout from "../../components/Layout/LayoutComp";

export default function mood() {
  const [playing, setPlaying] = useState(false);
  const [moodUser, setMoodUser] = useState("happy");
  const [genre, setGenre] = useState("");
  const videoRef = useRef();
  const canvasRef = useRef();

  const [currentMood, setCurrentMood] = useRecoilState(currentMoodState);
  const [selectedGenre, setSelectedGenre] = useRecoilState(selectedGenreState);

  const router = useRouter();
  const availableGenre = useGetAvailableGenre();

  const handleGetRecommendations = () => {
    setCurrentMood(moodUser);
    setSelectedGenre(genre);
    setInterval(() => {
      router.push("/recommendationsPage");
    }, 1000);
  };

  const startVideo = () => {
    setPlaying(true);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((currentStream) => {
        videoRef.current.srcObject = currentStream;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const stopVideo = () => {
    setPlaying(false);
    const video = document.getElementsByClassName("app__videoFeed")[0];
    video.srcObject.getTracks()[0].stop();
  };

  return (
    <>
      <Layout pageTitle="Mood Page">
        <div className="max-w-full min-h-screen pt-14 px-8 bg-[#F4F5FC] shadow-sm rounded-l-3xl text-gray-800">
          <h1 className="text-4xl text-gray-900 font-bold mb-10">
            Identifikasi Suasana Hati
          </h1>
          <div className="flex flex-col md:flex-row border shadow-lg rounded-lg">
            {/* flex kiri */}
            <div className="relative aspect-video w-1/2">
              <video
                ref={videoRef}
                muted
                autoPlay
                className="app__videoFeed"
                crossOrigin="anonymous"
              />
              <canvas
                ref={canvasRef}
                className="absolute right-0 left-0 top-0 w-full"
              />
            </div>
            {/* flex kanan */}
            <div className="basis-1/2 flex items-center justify-center px-6 pb-4">
              {/* dropdown genre */}
              <div className="p-4">
                <label htmlFor="genreInput">
                  genre :
                  <select
                    value={genre}
                    onChange={(e) => {
                      setGenre(e.target.value);
                    }}
                    className="ml-2 border"
                  >
                    <option defaultValue>Please choose one option</option>
                    {availableGenre?.genres?.map((genres, index) => {
                      return <option key={index}>{genres}</option>;
                    })}
                  </select>
                </label>
              </div>
              {/* button start video */}
              {playing ? (
                <button
                  className="text-black p-2 bg-slate-300 rounded-md hover:bg-slate-400"
                  onClick={stopVideo}
                >
                  Stop Camera
                </button>
              ) : (
                <button
                  className="text-black p-2 bg-slate-300 rounded-md hover:bg-slate-400"
                  onClick={startVideo}
                >
                  Start Camera
                </button>
              )}
            </div>
          </div>
          <p>MOOD : {currentMood}</p>
          <p>GENRE : {selectedGenre}</p>
          <button onClick={handleGetRecommendations}>CLICK</button>
        </div>
        <div></div>
      </Layout>
    </>
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
