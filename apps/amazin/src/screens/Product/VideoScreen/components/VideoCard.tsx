import { memo, Suspense } from 'react';

import { NO_IMAGE } from 'src/constants';
import { dummyMovies, getImgUrl } from 'src/utils';
import { LazyImg } from 'src/apis/suspenseAPI';
import { ImgFallback } from 'src/components/Fallbacks';
import ButtonBuy from './ButtonBuy';
import ButtonTrailer from './ButtonTrailer';
import Rating from 'src/components/Rating';

type PropType = {
  movie?: MovieType;
  portrait?: boolean;
  trailerUrl: string;
  setTrailerUrl: SetStateType<string>;
  children?: Children;
};

export function VideoCard({ movie = dummyMovies[0], portrait, trailerUrl, setTrailerUrl, children }: PropType) {
  return (
    <div className={`m-card ${portrait ? 'm-card--portrait' : ''}`}>
      <Suspense fallback={<ImgFallback portrait={portrait} />}>
        <LazyImg
          src={getImgUrl(movie._id, movie.image ? movie.image.split('^')[1 - Number(portrait)] : NO_IMAGE)}
          alt={movie.name}
        />
      </Suspense>
      <div className="m-card__background">
        <div className="m-card__text">
          {(movie?.description?.slice(0, 150) || 'Description ') + '..'}
          <div className="m-card__rating">
            <Rating rating={2 * (movie?.rating ?? 0)} steps={10} numReviews={movie?.numReviews} />
          </div>
        </div>

        <div className="m-card__more">
          <ButtonTrailer movie={movie} trailerUrl={trailerUrl} setTrailerUrl={setTrailerUrl} />
          <ButtonBuy movie={movie} />
        </div>
      </div>

      <div className="m-card__info">
        <div className="m-card__name">{children || movie.name}</div>
      </div>
    </div>
  );
}

export default memo(VideoCard);
