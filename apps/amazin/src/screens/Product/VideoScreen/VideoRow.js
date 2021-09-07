import { lazy, memo, useState } from 'react';

import { SuspenseLoad } from 'src/components/CustomSuspense';
import Carousel, { responsive } from 'src/constants';
import UTube from './components/UTube';
const VideoCard = lazy(() => import(/* webpackPrefetch: true */ './components/VideoCard'));

function VideoRow({ title, movies, portrait = false }) {
  const [trailerUrl, setTrailerUrl] = useState('');

  if (!movies[title]?.length) return null;

  return (
    <div className="m-row">
      <h2>{title}</h2>
      {!!movies[title] && (
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
          {movies[title]?.map((movie, id) => (
            <SuspenseLoad key={id}>
              <VideoCard movie={movie} portrait={portrait} trailerUrl={trailerUrl} setTrailerUrl={setTrailerUrl} />
            </SuspenseLoad>
          ))}
        </Carousel>
      )}

      <UTube trailerUrl={trailerUrl} />
    </div>
  );
}

export default memo(VideoRow);
