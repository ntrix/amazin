import React, { useState } from "react";
import Rating from "../../../components/Rating";
import Carousel, { responsive } from "../../../utils";
import UTube, { VideoButtons } from "./VideoButtons";

export default function VideoRow({ title, movies = [], large = false }) {
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
        customTransition="transform 300ms ease-in-out"
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
                    <VideoButtons
                      movie={movie}
                      trailerUrl={trailerUrl}
                      setTrailerUrl={setTrailerUrl}
                    />
                  </div>
                </div>

                <div className="m-card__info">
                  <div className="m-card__name">{movie.name}</div>
                </div>
              </div>
            )
        )}
      </Carousel>

      <UTube trailerUrl={trailerUrl} />
    </div>
  );
}
