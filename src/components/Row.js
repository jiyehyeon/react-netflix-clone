import axios from "../api/axios";
import React, { useState, useEffect } from "react";
import "./Row.css";

export default function Row({ title, fetchUrl, isLargeRow, id }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
    console.log(request.data.results);
  };

  return (
    <section className="row">
      <h2 className="row-header-title">{title}</h2>
      <div className="slider">
        <div className="slider__arrow left">
          <span className="arrow">{"<"}</span>
        </div>
        <div id={id} className="slider__items">
          {movies.map((movie) => {
            return (
              <img
                key={movie.id}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={`https://image.tmdb.org/t/p/original/${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.title || movie.original_title}
              />
            );
          })}
        </div>
        <div className="slider__arrow right">
          <span className="arrow">{">"}</span>
        </div>
      </div>
    </section>
  );
}
