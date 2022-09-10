import axios from "../api/axios";
import React, { useEffect, useState } from "react";
import requests from "../api/requests";
import "./Banner.css";
import Trailer from "./Trailer";

export default function Banner() {
  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // 현재 상영중인 영화 정보 가져오기
    const request = await axios.get(requests.fetchNowPlaying);
    const movieId =
      request.data.results[
        Math.floor(Math.random() * request.data.results.length)
      ].id;
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: "videos" },
    });
    setMovie(movieDetail);
  };

  const truncate = (str, n) => {
    if (str) return str.length > n ? str.substr(0, n - 1) + "..." : str;
    return "";
  };

  const checkVideo = () => {
    if (movie.videos.results.length > 0) {
      setIsClicked(true);
    } else {
      alert("예고편 준비중입니다.");
    }
  };

  if (!isClicked) {
    return (
      <header
        className="banner"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">
            {movie.title || movie.original_title}
          </h1>

          <h1 className="banner__description">
            {truncate(movie.overview, 100)}
          </h1>
          <div className="banner__buttons">
            <button
              className="banner__button play"
              onClick={() => checkVideo()}
            >
              재생
            </button>
            <button className="banner__button info">상세 정보</button>
          </div>
        </div>
        <div className="banner--fadeBottom" />
      </header>
    );
  }
  if (isClicked) {
    return (
      <Trailer
        setIsClicked={setIsClicked}
        currentMovie={movie.videos.results[0]}
      />
    );
  }
}
