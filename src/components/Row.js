import axios from "../api/axios";
import React, { useState, useEffect } from "react";
import "./Row.css";
import MovieModal from "./MovieModal";

export default function Row({ title, fetchUrl, isLargeRow, id }) {
  const [movies, setMovies] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState({});

  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
  };

  const slideRight = (id) => {
    const elem = document.getElementById(id);
    const contentWidth = elem.querySelector(".row__poster").offsetWidth;
    let newSlideIndex = slideIndex + 6;
    if (newSlideIndex > movies.length - 6) {
      newSlideIndex = movies.length - 6;
    }
    elem.style.transform = `translateX(-${newSlideIndex * contentWidth}px)`;
    setSlideIndex(newSlideIndex);
  };

  const slideLeft = (id) => {
    const elem = document.getElementById(id);
    const contentWidth = elem.querySelector(".row__poster").offsetWidth;
    let newSlideIndex = slideIndex - 6;
    if (newSlideIndex < 0) {
      newSlideIndex = 0;
    }
    elem.style.transform = `translateX(-${newSlideIndex * contentWidth}px)`;
    setSlideIndex(newSlideIndex);
  };

  const handleClick = (movie) => {
    setModalOpen(true);
    setSelectedMovie(movie);
  };

  return (
    <section className="row">
      <h2 className="row-header-title">{title}</h2>
      <div className="slider">
        <div className="slider__arrow left">
          <span className="arrow" onClick={() => slideLeft(id)}>
            {"<"}
          </span>
        </div>
        <div id={id} className="slider__items">
          {movies.map((movie) => {
            return (
              <img
                key={movie.id}
                onClick={() => handleClick(movie)}
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
          <span
            className="arrow"
            onClick={() => {
              slideRight(id);
            }}
          >
            {">"}
          </span>
        </div>
      </div>
      {modalOpen && (
        <MovieModal id={selectedMovie.id} setModalOpen={setModalOpen} />
      )}
    </section>
  );
}
