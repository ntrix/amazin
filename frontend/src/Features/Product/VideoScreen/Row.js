import React, { useEffect, useState, forwardRef } from "react";
import axios from "./axios";
import YouTube from "react-youtube";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
const movieTrailer = require("movie-trailer");

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1500 },
    items: 5,
    slidesToSlide: 4, // optional, default to 1.
  },
  largeDesktop: {
    breakpoint: { max: 1500, min: 1080 },
    items: 4,
    slidesToSlide: 3, // optional, default to 1.
  },
  desktop: {
    breakpoint: { max: 1080, min: 720 },
    items: 3,
    slidesToSlide: 2, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 720, min: 480 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 480, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const opts = {
  height: "390",
  width: "60%",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};
const base_url = "https://image.tmdb.org/t/p/original/";

export const truncate = (text, len) =>
  text?.length > len ? text.substr(0, len - 1) + ".." : text;

const Row = forwardRef(({ title, source, large = false }, ref) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      if (!source) return;
      const request = await axios.get(source).catch((e) => console.log(e));
      setMovies(request.data.results);
    }
    fetchData();
  }, [source]);

  const checkTrailer = (movie) => {
    const name =
      movie?.title ||
      movie?.name ||
      movie?.original_title ||
      movie?.original_name ||
      "";
    try {
      if (trailerUrl) {
        setTrailerUrl("");
      } else {
        movieTrailer(name)
          .then((url) => {
            const urlParams = new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParams.get("v"));
          })
          .catch((e) => {
            console.log(e);
            setTrailerUrl(-1);
          });
      }
    } catch (e) {
      setTrailerUrl(-1);
    }
  };
  const handleClick = () => {};

  return (
    <div className="m-row">
      <h2>{title}</h2>
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={false}
        responsive={responsive}
        infinite={false}
        autoPlay={false}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {movies.slice(0, 20).map(
          (movie) =>
            ((large && movie.poster_path) ||
              (!large && movie.backdrop_path)) && (
              <div
                key={movie.id}
                className={"m-card" + (large ? " m-card--xl" : "")}
              >
                <img
                  ref={ref}
                  src={`${base_url}${
                    large ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.title}
                />
                <div className="m-card__background">
                  <div className="m-card__text">
                    {truncate(movie?.overview, 100)}
                    <p className="m-card__rating">
                      <b>Rating: {movie?.vote_average / 2}</b>
                    </p>
                  </div>
                  <div className="m-card__more">
                    <button
                      className="banner__button"
                      onClick={() => {
                        handleClick();
                        checkTrailer(movie);
                      }}
                    >
                      Trailer
                    </button>
                    <button className="banner__button">Rent/Buy</button>
                  </div>
                </div>
                <div className="m-card__info">
                  <div className="m-card__name">
                    {movie?.title ||
                      movie?.name ||
                      movie?.original_title ||
                      movie?.original_name}
                  </div>
                </div>
              </div>
            )
        )}
      </Carousel>
      {trailerUrl && (
        <div className="trailer__frame">
          <YouTube
            className="movie__trailer"
            videoId={trailerUrl === -1 ? "k4D7cuDAvXE" : trailerUrl}
            opts={opts}
          />
        </div>
      )}
    </div>
  );
});

export const RowToBuy = ({ title, movies, large = false }) => {
  const [trailerUrl, setTrailerUrl] = useState("");
  return (
    <div className="m-row">
      <h2>{title}</h2>
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={false}
        responsive={responsive}
        infinite={false}
        autoPlay={false}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {movies.map((movie) => (
          <div key={movie} className={"m-card" + (large ? " m-card--xl" : "")}>
            <img src={movie.image.split("^")[large ? 0 : 1]} alt={movie.name} />
            <div className="m-card__background">
              <div className="m-card__text">
                {truncate(movie.description, 100)}
                <p className="m-card__rating">
                  <b>Rating: {movie.rating}</b>
                </p>
              </div>
              <div className="m-card__more">
                <button
                  className="banner__button"
                  onClick={() => setTrailerUrl(trailerUrl ? "" : movie.video)}
                >
                  Trailer
                </button>
                <Link
                  className="banner__button"
                  to={`/cart/${movie._id}?qty=1`}
                >
                  Rent/Buy
                </Link>
              </div>
            </div>
            <div className="m-card__info">
              <div className="m-card__name">{movie.name}</div>
            </div>
          </div>
        ))}
      </Carousel>
      {trailerUrl && (
        <div className="trailer__frame">
          <YouTube
            className="movie__trailer"
            videoId={trailerUrl === "no trailer" ? "k4D7cuDAvXE" : trailerUrl}
            opts={opts}
          />
        </div>
      )}
    </div>
  );
};

export default Row;
