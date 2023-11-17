import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import {
  currentMoodState,
  selectedGenreState,
} from "../../atoms/recommendationsAtom";
import * as faceapi from "face-api.js";

export default function TestComp1() {
  const [identifiedMood, setIdentifiedMood] = useState(false);
  const [mood, setMood] = useState(null);
  const [genre, setGenre] = useState("");
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [captureVideo, setCaptureVideo] = useState(false);
  const [stage, setStage] = useState("");
  const router = useRouter();
  const videoRef = useRef();
  const canvasRef = useRef();
  const WIDTH = 940;
  const HEIGHT = 650;
  const [currentMood, setCurrentMood] = useRecoilState(currentMoodState);
  const [selectedGenre, setSelectedGenre] = useRecoilState(selectedGenreState);

  const availableGenre = ["pop", "rock", "hip-hop", "edm", "dance"];

  // OPEN FACE WEBCAM
  useEffect(() => {
    const loadModels = async () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      ]).then(setModelsLoaded(true));
    };
    loadModels();
  }, []);

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

  const handleVideoOnPlay = () => {
    setStage("identify");
    setInterval(async () => {
      if (canvasRef && canvasRef.current) {
        const detections = await faceapi
          .detectSingleFace(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceExpressions();

        if (detections !== null && detections !== undefined) {
          setIdentifiedMood(true);
          setMood(detections);
          setStage("result");
          // DRAW FACE IN WEBCAM
          canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(
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
          faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
          faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
        }
      }
    }, 1000);
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
    clearInterval(handleVideoOnPlay);
    setStage("finish");
    closeWebcam();
    setTimeout(() => {
      router.push("/recommendationsPage");
    }, 2000);
  };

  return (
    <>
      <div className="container relative mx-auto flex px-5 py-12 mb-12 md:flex-row flex-col items-center bg-white rounded-md border shadow-md">
        <div className="relative lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0 border">
          <video
            ref={videoRef}
            height={HEIGHT}
            width={WIDTH}
            onPlay={handleVideoOnPlay}
            crossOrigin="anonymous"
          />
          <canvas
            ref={canvasRef}
            className="absolute right-0 left-0 top-0 w-full"
          />
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="title-font text-start sm:text-2xl text-xl mb-4 font-medium text-gray-900">
            Arahkan wajah mu ke kamera
          </h1>
          <p className="mb-8 leading-relaxed">
            pastikan saat pengambilan gambar tidak menggunakan masker dan
            mendapatkan pencahaan yang cukup
          </p>
          <div className="">
            <label className="flex flex-col" htmlFor="genreInput">
              Genre musik yang disukai :
              <select
                value={genre}
                onChange={(e) => {
                  setGenre(e.target.value);
                }}
                className="border"
              >
                <option defaultValue>Pilih salah satu genre</option>
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
              onClick={closeWebcam}
              className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Matikan kamera
            </button>
          ) : (
            <button
              onClick={startVideo}
              className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Ambil gambar
            </button>
          )}
          {identifiedMood && genre && (
            <button
              type="button"
              onClick={getRecommendations}
              className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Selanjutnya
            </button>
          )}
        </div>
      </div>
    </>
  );
}
