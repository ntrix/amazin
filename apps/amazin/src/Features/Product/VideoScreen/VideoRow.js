import React, { Suspense, useState } from 'react';
import Carousel, { responsive } from '../../../constants';
import UTube from './components/UTube';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorFallback, videoFallback } from '../../../components/Fallbacks';

const VideoCard = React.lazy(() =>
  import(/* webpackPrefetch: true */ './components/VideoCard')
);

export function _VideoRow({ title, movies, portrait = false }) {
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
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense fallback={videoFallback}>
                  <VideoCard
                    key={id}
                    movie={movie}
                    portrait={portrait}
                    trailerUrl={trailerUrl}
                    setTrailerUrl={setTrailerUrl}
                  />
                </Suspense>
              </ErrorBoundary>
            ))}
          </Carousel>

          <UTube trailerUrl={trailerUrl} />
        </>
      )}
    </div>
  );
}

const VideoRow = React.memo(_VideoRow);
export default VideoRow;
