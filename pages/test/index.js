import React, { useState } from "react";
import LayoutComp from "../../components/Layout/LayoutComp";
import { getSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import {
  currentMoodState,
  selectedGenreState,
} from "../../atoms/recommendationsAtom";
import useGetAvailableGenre from "../../hooks/useGetAvailableGenre";

export default function Test() {
  const [moodUser, setMoodUser] = useState("");
  const [genre, setGenre] = useState("");
  const [currentMood, setCurrentMood] = useRecoilState(currentMoodState);
  const [selectedGenre, setSelectedGenre] = useRecoilState(selectedGenreState);

  const router = useRouter();
  const availableGenre = useGetAvailableGenre();

  const moodFaceApi = ["happy", "angry", "sad", "neutral"];

  const handleGetRecommendations = () => {
    setCurrentMood(moodUser);
    setSelectedGenre(genre);
    setInterval(() => {
      router.push("/recommendationsPage");
    }, 1000);
  };

  return (
    <LayoutComp pageTitle="Test">
      <div className="w-full h-screen flex justify-center items-center p-12 text-gray-800">
        <div className="w-full h-full p-5 shadow-md border bg-white rounded-md">
          <h3>MOOD</h3>
          <div className="p-4">
            <label>
              mood :
              <select
                value={moodUser}
                onChange={(e) => {
                  setMoodUser(e.target.value);
                }}
                className="ml-2 border"
              >
                <option defaultValue>Please choose one option</option>
                {moodFaceApi.map((mood, index) => {
                  return <option key={index}>{mood}</option>;
                })}
              </select>
            </label>
          </div>
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
          <div>
            <p>MOOD : {currentMood}</p>
            <p>GENRE : {selectedGenre}</p>
            <button onClick={handleGetRecommendations}>CLICK</button>
          </div>
        </div>
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
