import { lazy, memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { dummyMovies } from 'src/utils';
import { SuspenseLoad } from 'src/components/CustomSuspense';
import Carousel, { responsive } from 'src/constants';
import UTube from './components/UTube';
const VideoCard = lazy(() => import(/* webpackPrefetch: true */ './components/VideoCard'));

function VideoRow({ title, movies: _movies, portrait = false }) {
  const [trailerUrl, setTrailerUrl] = useState('');
  const [movies, setMovies] = useState(dummyMovies);
  const productList = useSelector((state) => state.productList);

  useEffect(() => {
    if (productList.success) setMovies(_movies);
  }, [productList.success, _movies]);

  if (!movies?.length) return null;

  return (
    <div className="m-row">
      <h2>{title}</h2>
      {!!movies && (
        <>
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
            {movies.map((movie, id) => (
              <SuspenseLoad key={id}>
                <VideoCard movie={movie} portrait={portrait} trailerUrl={trailerUrl} setTrailerUrl={setTrailerUrl} />
              </SuspenseLoad>
            ))}
          </Carousel>

          <UTube trailerUrl={trailerUrl} />
        </>
      )}
    </div>
  );
}

export default memo(VideoRow);
