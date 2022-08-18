import axios from "../../api/axios";
import React, { useEffect, useState } from "react";
import "./MovieModal.css";

export default function MovieModal({ id, setModalOpen }) {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    fetchMovie(id);
  }, []);

  const fetchMovie = async (id) => {
    const request = await axios.get(`/movie/${id}`);
    setMovie(request.data);
    console.log(request.data);
  };

  const getYear = (date) => {
    let [year, ,] = date.split("-");
    return year + "년";
  };

  return (
    <div className="modal-container">
      <div className="wrapper-modal">
        <div className="modal">
          <span onClick={() => setModalOpen(false)} className="modal-close-btn">
            X
          </span>
          <div
            className="modal-banner"
            style={{
              backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
            }}
          >
            <div className="img-fadeBottom"></div>
            <span className="modal-title">{movie.title}</span>
            <button className="modal-button">
              <span className="play__icon">&#9654;</span>
              <span className="play__text">재생</span>
            </button>
          </div>

          <div className="modal-contents">
            <div className="modal-info">
              <span className="rating">
                {movie.vote_average && movie.vote_average.toFixed(1)}
              </span>
              <span className="release-date">
                {movie.release_date && getYear(movie.release_date)}
              </span>
              <span className="runtime">
                {movie.runtime &&
                  `${Math.floor(movie.runtime / 60)}시간 ${
                    movie.runtime % 60
                  }분`}
              </span>
              <span className="modal-tags">
                {movie.genres &&
                  movie.genres.map((genre, i) => {
                    return (
                      <span className="tag-item" key={genre.id}>
                        {genre.name}
                        {i < movie.genres.length - 1 && ", "}
                      </span>
                    );
                  })}
              </span>
              <p className="overview">{movie.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
