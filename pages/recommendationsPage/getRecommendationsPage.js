import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { Tooltip } from "react-tooltip";
import * as faceapi from "face-api.js";
// STATE MANAGEMENT
import { useRecoilState } from "recoil";
import {
  currentMoodState,
  selectedGenreState,
} from "../../atoms/recommendationsAtom";
// COMPONENTS
import Layout from "../../components/Layout/LayoutComp";

export default function getRecommendationsPage() {
  const [identifiedMood, setIdentifiedMood] = useState(false);
  const [mood, setMood] = useState(null);
  const [genre, setGenre] = useState("");
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [captureVideo, setCaptureVideo] = useState(false);
  const router = useRouter();
  const videoRef = useRef();
  const canvasRef = useRef();
  const WIDTH = 640;
  const HEIGHT = 480;
  const [currentMood, setCurrentMood] = useRecoilState(currentMoodState);
  const [selectedGenre, setSelectedGenre] = useRecoilState(selectedGenreState);
  const [recommendationStatus, setRecommendationStatus] = useState(false);

  const availableGenre = [
    "pop",
    "rock",
    "hip-hop",
    "electronic",
    "disco",
    "r-n-b",
  ];

  // Load models
  useEffect(() => {
    const loadModels = async () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      ]).then(setModelsLoaded(true));
    };
    loadModels();
  }, []);

  // TESTING
  useEffect(() => {
    if (captureVideo) {
      const currentPath = router.asPath;
      router.beforePopState(({ as }) => {
        if (as !== currentPath) {
          closeWebcam();
        }
        return true;
      });
    }
    return () => {
      router.beforePopState(() => true);
    };
  }, [router, captureVideo]);
  // TESTING

  const startVideo = () => {
    setCaptureVideo(true);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  const handleDetectFacialExpression = () => {
    setInterval(async () => {
      if (canvasRef.current && videoRef.current) {
        const detections = await faceapi
          .detectSingleFace(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceExpressions();
        if (detections !== null && detections !== undefined) {
          setMood(detections);

          canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
            videoRef.current
          );

          faceapi.matchDimensions(canvasRef.current, {
            width: WIDTH,
            height: HEIGHT,
          });

          const resized = faceapi.resizeResults(detections, {
            width: WIDTH,
            height: HEIGHT,
          });

          faceapi.draw.drawDetections(canvasRef.current, resized);
          faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
          setIdentifiedMood(true);
        }
      }
    }, 500);
  };

  const closeWebcam = () => {
    videoRef.current.pause();
    videoRef.current.srcObject.getTracks()[0].stop();
    setCaptureVideo(false);
  };

  const getRecommendations = () => {
    const Array = Object.entries(mood.expressions);
    const scoresArray = Array.map((i) => i[1]);
    const expressionsArray = Array.map((i) => i[0]);
    const max = Math.max.apply(null, scoresArray);
    const index = scoresArray.findIndex((score) => score === max);
    const expression = expressionsArray[index];
    setCurrentMood(expression);
    setSelectedGenre(genre);
    clearInterval(handleDetectFacialExpression);
    closeWebcam();
    setTimeout(() => {
      router.push("/recommendationsPage");
    }, 3000);
  };

  return (
    <>
      <Layout pageTitle="Mood Page">
        <div className="max-w-full min-h-screen pt-14 px-8 text-gray-800 mb-24">
          {/* main */}
          <h3 className="text-4xl text-gray-900 font-bold mb-10">
            Dapatkan Rekomendasi
          </h3>
          <div className="container relative mx-auto flex px-5 pt-10 pb-24 mb-12 md:flex-row flex-col items-center bg-white rounded-md border shadow-md">
            <div className="relative aspect-video lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0 border">
              <video
                ref={videoRef}
                height={HEIGHT}
                width={WIDTH}
                onPlay={handleDetectFacialExpression}
                crossOrigin="anonymous"
              />
              <canvas
                ref={canvasRef}
                height={HEIGHT}
                width={WIDTH}
                className="absolute border border-red-500 right-0 left-0 top-0 w-full"
              />
            </div>
            <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start text-left">
              <h1 className="title-font text-start sm:text-2xl text-xl mb-4 font-medium text-gray-900">
                Arahkan wajah mu ke kamera
              </h1>
              <p className="mb-8 leading-relaxed">
                pastikan saat pengambilan gambar tidak menggunakan masker dan
                mendapatkan pencahaan yang cukup
              </p>
              <div className="">
                <label className="flex flex-col" htmlFor="genreInput">
                  <span className="font-semibold">
                    Genre musik yang disukai :
                  </span>
                  <select
                    value={genre}
                    onChange={(e) => {
                      setGenre(e.target.value);
                    }}
                    className="border w-1/2 md:w-full"
                  >
                    <option hidden value>
                      Pilih salah satu genre
                    </option>
                    {availableGenre.map((genres, index) => {
                      return <option key={index}>{genres}</option>;
                    })}
                  </select>
                </label>
              </div>
            </div>
            <div className="absolute bottom-5 right-5 flex gap-2">
              {captureVideo ? (
                <button
                  onClick={startVideo}
                  className="flex-shrink-0 text-white bg-gradient-to-r from-[#86350f] to-[#894e00] border-0 py-2 md:py-2.5 px-4 md:px-6 rounded-lg text-sm md:text-base shadow-lg"
                >
                  Mulai
                </button>
              ) : (
                <button
                  onClick={startVideo}
                  className="flex-shrink-0 text-white bg-gradient-to-r from-[#EF733A] to-[#EF9E33] border-0 py-2 md:py-2.5 px-4 md:px-6 focus:outline-none transition ease-in-out hover:-translate-y-1 duration-300 rounded-lg text-sm md:text-base font-medium shadow-lg"
                >
                  Mulai
                </button>
              )}
              {identifiedMood && genre ? (
                <button
                  type="button"
                  onClick={getRecommendations}
                  className="flex-shrink-0 text-white bg-gradient-to-r from-[#EF733A] to-[#EF9E33] border-0 py-2 md:py-2.5 px-4 md:px-6 focus:outline-none transition ease-in-out hover:-translate-y-1 duration-300 rounded-lg text-sm md:text-base font-medium shadow-lg"
                >
                  Dapatkan Rekomendasi
                </button>
              ) : (
                <>
                  {identifiedMood && !genre ? (
                    <button
                      type="button"
                      disabled
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Pilih genre terlebih dahulu"
                      className="flex-shrink-0 text-white bg-gradient-to-r from-[#86350f] to-[#894e00] border-0 py-2 md:py-2.5 px-4 md:px-6 rounded-lg text-sm md:text-base shadow-lg"
                    >
                      Dapatkan Rekomendasi
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Dapatkan mood terlebih dahulu"
                      className="flex-shrink-0 text-white bg-gradient-to-r from-[#86350f] to-[#894e00] border-0 py-2 md:py-2.5 px-4 md:px-6 rounded-lg text-sm md:text-base shadow-lg"
                    >
                      Dapatkan Rekomendasi
                    </button>
                  )}
                  <Tooltip id="my-tooltip" />
                </>
              )}
            </div>
          </div>
        </div>
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
