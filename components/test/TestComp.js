import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { currentMoodUserState } from "../../atoms/moodAtom";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";

export default function TestComp() {
  const [playing, setPlaying] = useState(false);
  const router = useRouter();
  const [faceExpressions, setFaceExpressions] = useState(null);
  const videoRef = useRef();
  const canvasRef = useRef();
  const [currentMoodUser, setCurrentMoodUser] =
    useRecoilState(currentMoodUserState);

  // load useeffect
  useEffect(() => {
    loadModels();
  }, []);

  // membuka webcam
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

  // load models dari face api
  const loadModels = () => {
    Promise.all([
      // face detect dan load dari public/models dir
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]);
  };

  const faceMyDetect = async () => {
    startVideo();

    const detections = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (detections) {
      setFaceExpressions(detections);
    }

    canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(
      videoRef.current
    );
    faceapi.matchDimensions(canvasRef.current, {
      width: 940,
      height: 650,
    });

    const resized = faceapi.resizeResults(detections, {
      width: 940,
      height: 650,
    });

    faceapi.draw.drawDetections(canvasRef.current, resized);
    faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
    console.log(detections);

    return detections;
  };

  const stopVideo = () => {
    setPlaying(false);
    const video = document.getElementsByClassName("app__videoFeed")[0];
    video.srcObject.getTracks()[0].stop();
  };

  const getFaceDetection = () => {
    setInterval(() => {
      // faceExpressions.map((detectionsWithExpression) => {
      const Array = Object.entries(faceExpressions.expressions);
      const scoresArray = Array.map((i) => i[1]);
      const expressionsArray = Array.map((i) => i[0]);
      const max = Math.max.apply(null, scoresArray);
      const index = scoresArray.findIndex((score) => score === max);
      const expression = expressionsArray[index];
      setCurrentMoodUser(expression);
      stopVideo();

      router.push("/recommendationsPage");
      // });
    }, 1000);
  };

  return (
    // <main className="min-h-screen max-w-full p-8 pt-11 bg-[#F4F5FC] shadow-sm rounded-l-3xl">
    <>
      <h1 className="text-4xl text-gray-900 font-bold mb-10">
        Identifikasi Suasana Hati
      </h1>
      <div className="flex flex-col md:flex-row border shadow-lg rounded-lg">
        {/* flex kiri */}
        <div className="relative aspect-video">
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
          <h2 className="w-2/3 font-normal text-lg mt-5">
            Arahkan wajahmu ke kamera dan biarkan ekspresimu berbicara. Tunggu
            sesaat dan temukan keajaiban di balik lensa!
          </h2>
          {faceExpressions ? (
            <button
              className="text-black p-2 bg-slate-300 rounded-md mt-5 hover:bg-slate-400"
              onClick={getFaceDetection}
            >
              Dapatkan Rekomendasi
            </button>
          ) : (
            <button
              className="text-black p-2 bg-slate-300 rounded-md mt-5 hover:bg-slate-400"
              onClick={faceMyDetect}
            >
              Mulai deteksi wajah
            </button>
          )}
          {playing ? (
            <button
              className="text-black p-2 bg-slate-300 rounded-md mt-5 hover:bg-slate-400"
              onClick={stopVideo}
            >
              Stop
            </button>
          ) : (
            <button
              className="text-black p-2 bg-slate-300 rounded-md mt-5 hover:bg-slate-400"
              onClick={startVideo}
            >
              Start
            </button>
          )}
        </div>
      </div>
    </>
    // </main>
  );
}
