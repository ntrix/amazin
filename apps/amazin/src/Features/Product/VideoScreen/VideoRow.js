import React, { useState } from 'react';
import Carousel, { responsive } from '../../../constants';
import UTube from './UTube';
import VideoCard from './VideoCard';

export default function VideoRow({ title, movies, portrait = false }) {
  const [trailerUrl, setTrailerUrl] = useState('');

  return (
    <div className="m-row">
      <h2>{title}</h2>
      {movies && (
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
            removeArrowOnDeviceType={['mobile']}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {movies.map((movie, id) => (
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
