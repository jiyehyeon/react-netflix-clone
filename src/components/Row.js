import axios from "../api/axios";
import React, { useState, useEffect, useRef } from "react";
import "./Row.css";
import MovieModal from "./MovieModal";

export default function Row({ title, fetchUrl, isLargeRow, id }) {
  const [movies, setMovies] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState({});

  const imageRef = useRef();
  const rowRef = useRef();

  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    try {
      const res = await axios.get(fetchUrl);
      const hasImage = res.data.results.filter(
        (movie) => movie.backdrop_path != null
      );
      setMovies(hasImage);
    } catch (err) {
      console.log(err);
    }
  };

  const slide = (direction) => {
    console.log(direction);

    let movieImage = imageRef.current;

    let numberOfShown = Math.floor(
      (window.innerWidth * 0.92) / movieImage.offsetWidth
    );

    console.log(numberOfShown);

    let newSlideIndex =
      direction === "left"
        ? slideIndex - numberOfShown
        : slideIndex + numberOfShown;

    if (direction === "left" && newSlideIndex < 0) {
      newSlideIndex = 0;
    }

    if (
      direction === "right" &&
      newSlideIndex > movies.length - numberOfShown
    ) {
      newSlideIndex = movies.length - numberOfShown;
    }

    rowRef.current.style.transform = `translateX(-${newSlideIndex *
      movieImage.offsetWidth}px)`;
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
          <span className="arrow" onClick={() => slide("left")}>
            {"<"}
          </span>
        </div>
        <div id={id} className="slider__items" ref={rowRef}>
          {movies.map((movie) => {
            return (
              <img
                key={movie.id}
                onClick={() => handleClick(movie)}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={`https://image.tmdb.org/t/p/original${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.title || movie.original_title}
                ref={imageRef}
              />
            );
          })}
        </div>
        <div className="slider__arrow right">
          <span className="arrow" onClick={() => slide("right")}>
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
