import { memo, useState } from 'react';

import { Suspense } from 'src/components/CustomSuspense';
import { VideoCardFallBack } from 'src/components/Fallbacks';
import VideoCard from './components/VideoCard';
import Carousel, { responsive } from 'src/constants';
import UTube from './components/UTube';

function VideoRow({ label, genre, movies, portrait = false }) {
  const [trailerUrl, setTrailerUrl] = useState('');

  return movies[genre]?.length ? (
    <div className="m-row">
      <h2>{label || genre}</h2>
      {!!movies[genre] && (
        <Carousel
          swipeable={true}
          draggable={false}
          showDots={false}
          responsive={responsive}
          infinite={true}
          autoPlay={false}
          keyBoardControl={true}
          customTransition="transform 300ms ease-in-out"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={[]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {movies[genre]?.map((movie, id) => (
            <Suspense key={id} fallback={<VideoCardFallBack portrait={portrait} />}>
              <VideoCard movie={movie} portrait={portrait} trailerUrl={trailerUrl} setTrailerUrl={setTrailerUrl} />
            </Suspense>
          ))}
        </Carousel>
      )}

      <UTube trailerUrl={trailerUrl} />
    </div>
  ) : null;
}

export default memo(VideoRow);
