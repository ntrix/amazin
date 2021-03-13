import React, { useState } from "react";
import { Link } from "react-router-dom";
import YouTube from "react-youtube";
import Rating from "../../../components/Rating";
import Carousel, { responsive } from "../../../utils";
const movieTrailer = require("movie-trailer");

const opts = {
  height: "390",
  width: "60%",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

export default function VideoRow({ title, movies, large = false }) {
  const [trailerUrl, setTrailerUrl] = useState("");

  const checkTrailer = (movie) => {
    if (trailerUrl) return setTrailerUrl("");
    movieTrailer(movie?.name)
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
      })
      .catch((e) => setTrailerUrl(-1));
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
        {movies.map(
          (movie) =>
            movie.images && (
              <div
                key={movie.name}
                className={"m-card" + (large ? " m-card--xl" : "")}
              >
                <img
                  src={movie.images ? movie.images[large ? 1 : 0] : ""}
                  alt={movie.name}
                />
                <div className="m-card__background">
                  <div className="m-card__text">
                    {movie?.description.slice(0, 150) + ".."}
                    <div className="m-card__rating">
                      <Rating
                        rating={movie?.rating}
                        steps={10}
                        numReviews={movie?.numReviews}
                      />
                    </div>
                  </div>
                  <div className="m-card__more">
                    {trailerUrl ? (
                      <button
                        className="banner__button"
                        onClick={() => setTrailerUrl("")}
                      >
                        <i className="fa fa-stop"></i> Close
                      </button>
                    ) : movie.video ? (
                      <button
                        className={
                          "banner__button" +
                          (movie.video !== "no trailer" ? "" : " disabled")
                        }
                        onClick={() => setTrailerUrl(movie.video)}
                      >
                        <i className="fa fa-play"></i> Trailer
                      </button>
                    ) : (
                      <button
                        className="banner__button"
                        onClick={() => {
                          handleClick();
                          checkTrailer(movie);
                        }}
                      >
                        <i className="fa fa-search"></i> Trailer
                      </button>
                    )}
                    <Link
                      className={
                        //is there any seller sells this movie?
                        "banner__button" + (movie.seller ? "" : " disabled")
                      }
                      to={movie.seller ? `/cart/${movie._id}?qty=1` : `#`}
                    >
                      <i className="fa fa-shopping-cart"></i> Rent[Buy]
                    </Link>
                  </div>
                </div>
                <div className="m-card__info">
                  <div className="m-card__name">{movie.name}</div>
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
}
