import React, { useEffect, useState } from "react";
import Carousel, { dummyMovies, responsive } from "../../../utils";
import UTube from "./UTube";
import VideoCard from "./VideoCard";

export default function VideoRow({ title, movies = [], portrait = false }) {
  const [trailerUrl, setTrailerUrl] = useState("");
  let isMounted = false;

  useEffect(() => {
    isMounted = true;
    return () => (isMounted = false);
  }, []);

  return (
    <div className="m-row">
      <h2>{title}</h2>
      {isMounted && (
        <>
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
              <VideoCard
                key={id}
                movie={movie}
                portrait={portrait}
                trailerUrl={trailerUrl}
                setTrailerUrl={setTrailerUrl}
              />
            ))}
          </Carousel>

          <UTube trailerUrl={trailerUrl} />
        </>
      )}
    </div>
  );
}
