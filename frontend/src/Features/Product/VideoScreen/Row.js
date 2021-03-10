import React, { useEffect, useState, forwardRef } from "react";
import axios from "./axios";
import YouTube from "react-youtube";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const movieTrailer = require("movie-trailer");

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 1500, min: 1334 },
    items: 4,
    slidesToSlide: 3, // optional, default to 1.
  },
  desktop: {
    breakpoint: { max: 1600, min: 1024 },
    items: 3,
    slidesToSlide: 2, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 680 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 680, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
const base_url = "https://image.tmdb.org/t/p/original/";

export const truncate = (str, n) =>
  str?.length > n ? str.substr(0, n - 1) + "..." : str;

const Row = forwardRef(({ title, fetchUrl, isLargeRow = false }, ref) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      if (!fetchUrl) return;
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

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
  const opts = {
    height: "390",
    width: "60%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <div className="m-row">
      <h2>{title}</h2>
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={false}
        responsive={responsive}
        infinite={true}
        autoPlay={false}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {movies &&
          movies.slice(0, 6).map(
            (movie) =>
              ((isLargeRow && movie.poster_path) ||
                (!isLargeRow && movie.backdrop_path)) && (
                <div
                  key={movie.id}
                  onClick={() => {
                    handleClick();
                    checkTrailer(movie);
                  }}
                  className={`m-card ${isLargeRow && "m-card--xl"}`}
                >
                  <img
                    ref={ref}
                    key={movie.id}
                    src={`${base_url}${
                      isLargeRow ? movie.poster_path : movie.backdrop_path
                    }`}
                    alt={movie.title}
                  />
                  <div className="m-card__background">
                    <div className="m-card__text">
                      {truncate(movie?.overview, 100)}
                      <p>
                        <b>Rating: {movie?.vote_average / 2}</b>
                      </p>
                    </div>
                    <div className="m-card__more">
                      <div className="banner__button">Trailer</div>
                      <div className="banner__button">Rent/Buy</div>
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

export default Row;
