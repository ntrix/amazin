import { memo, useState } from 'react';
import Carousel from 'react-multi-carousel';

import { Suspense } from 'src/components/CustomSuspense';
import { VideoCardFallBack } from 'src/components/Fallbacks';
import VideoCard from './components/VideoCard';
import { GenreType, MoviesOpt, responsive, VideoType } from 'src/constants';
import UTube from './components/UTube';

export type VideoRowProps = {
  label: string;
  genre: GenreType;
  movies: MoviesOpt<(VideoType & ProductType)[]>;
  portrait?: boolean;
};

function VideoRow({ label, genre, movies, portrait = false }: VideoRowProps) {
  const [trailerUrl, setTrailerUrl] = useState('');

  return movies[genre]?.length ? (
    <div className="m-row">
      <h2>{label || genre}</h2>
      {!!movies[genre] && (
        <Carousel
          swipeable
          infinite
          keyBoardControl
          responsive={responsive}
          customTransition="transform 300ms ease-in-out"
          transitionDuration={500}
          containerClass="carousel-container"
          itemClass="carousel-item-padding-40-px"
        >
          {movies[genre]?.map((movie, id) => (
            <Suspense key={movie._id ?? id} fallback={<VideoCardFallBack portrait={portrait} />}>
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
