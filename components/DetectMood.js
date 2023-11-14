import * as faceapi from "face-api.js";
import React, { useEffect, useRef, useState } from "react";
import { drawEmoji } from "../utils/drawEmoji";
import Webcam from "react-webcam";
import { currentMoodUserState } from "../atoms/moodAtom";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";

export default function DetectMood() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [exp, setExp] = useState();
  const router = useRouter();
  const [currentMoodUser, setCurrentMoodUser] =
    useRecoilState(currentMoodUserState);

  const loadModels = async () => {
    const MODEL_URL = "/models";
    await Promise.all([
      faceapi.nets.tinyFaceDetector.load(MODEL_URL),
      faceapi.nets.faceExpressionNet.load(MODEL_URL),
    ]);
  };

  const faceDetectHandler = async () => {
    await loadModels();
    if (webcamRef.current && canvasRef.current) {
      const webcam = webcamRef.current.video;
      const canvas = canvasRef.current;
      webcam.width = webcam.videoWidth;
      webcam.height = webcam.videoHeight;
      canvas.width = webcam.videoWidth;
      canvas.height = webcam.videoHeight;
      const video = webcamRef.current.video;
      (async function draw() {
        const detectionsWithExpressions = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions();
        if (detectionsWithExpressions.length > 0) {
          drawEmoji(detectionsWithExpressions, canvasRef.current);
          setExp(detectionsWithExpressions);
        }
        requestAnimationFrame(draw);
      })();
    }
  };

  useEffect(() => {
    faceDetectHandler();
  }, []);

  const getFaceDetection = () => {
    setInterval(() => {
      exp.map((detectionsWithExpression) => {
        const Array = Object.entries(detectionsWithExpression.expressions);
        const scoresArray = Array.map((i) => i[1]);
        const expressionsArray = Array.map((i) => i[0]);
        const max = Math.max.apply(null, scoresArray);
        const index = scoresArray.findIndex((score) => score === max);
        const expression = expressionsArray[index];
        setCurrentMoodUser(expression);
        webcamRef.current.ended;
      });
    }, 1000);
  };

  return (
    <>
      <h1 className="text-4xl text-gray-900 font-bold mb-10">
        Identifikasi Suasana Hati {currentMoodUser}
      </h1>
      <div className="flex flex-col md:flex-row border shadow-lg rounded-lg">
        {/* flex kiri */}
        <div className="relative aspect-video">
          <Webcam
            audio={false}
            ref={webcamRef}
            width={212}
            height={212}
            className="w-full rounded-t-lg md:rounded-lg"
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
          {exp ? (
            <button
              className="text-black p-2 bg-slate-300 rounded-md mt-5 hover:bg-slate-400"
              onClick={getFaceDetection}
            >
              Get Detect My Face
            </button>
          ) : (
            <button
              className="text-black p-2 bg-slate-300 rounded-md mt-5 hover:bg-slate-400"
              onClick={faceDetectHandler}
            >
              Detect My Face
            </button>
          )}
        </div>
      </div>
    </>
  );
}
