import React, { useState } from "react";
import Rating from "../../../components/Rating";
import Carousel, {
  dummyMovies,
  getImgUrl,
  NO_IMAGE,
  responsive,
} from "../../../utils";
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
        {(movies || dummyMovies).map((movie, id) => (
          <div key={id} className={"m-card" + (large ? " m-card--xl" : "")}>
            <img
              src={getImgUrl(
                movie._id,
                movie.image ? movie.image.split("^")[large ? 0 : 1] : NO_IMAGE
              )}
              alt={movie.name}
            />

            <div className="m-card__background">
              <div className="m-card__text">
                {movie?.description.slice(0, 150) + ".."}
                <div className="m-card__rating">
                  <Rating
                    rating={movie?.rating * 2}
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
        ))}
      </Carousel>

      <UTube trailerUrl={trailerUrl} />
    </div>
  );
}
