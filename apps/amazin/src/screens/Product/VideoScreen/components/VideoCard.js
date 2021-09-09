import { memo, Suspense } from 'react';

import { NO_IMAGE, NO_IMAGE_P } from 'src/constants';
import { getImgUrl } from 'src/utils';
import { LazyImg } from 'src/apis/suspenseAPI';
import ButtonBuy from './ButtonBuy';
import ButtonTrailer from './ButtonTrailer';
import Rating from 'src/components/Rating';

const CardFallback = ({ portrait }) => (
  <>
    <img src={portrait ? NO_IMAGE_P : NO_IMAGE} alt="" />
    <div className="m-card__info">
      <div className="m-card__name">loading .....</div>
    </div>
  </>
);

export function VideoCard({ movie, portrait, trailerUrl, setTrailerUrl, children }) {
  return (
    <div className={`m-card ${portrait ? 'm-card--portrait' : ''}`}>
      <Suspense fallback={<CardFallback portrait={portrait} />}>
        <LazyImg
          src={getImgUrl(movie._id, movie.image ? movie.image.split('^')[1 - portrait] : NO_IMAGE)}
          alt={movie.name}
        />
        <div className="m-card__background">
          <div className="m-card__text">
            {(movie?.description?.slice(0, 150) || 'Description ') + '..'}
            <div className="m-card__rating">
              <Rating rating={movie?.rating * 2} steps={10} numReviews={movie?.numReviews} />
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
      </Suspense>
    </div>
  );
}

export default memo(VideoCard);

export const VideoCardFallBack = ({ portrait = false }) => (
  <div className={`m-card ${portrait ? 'm-card--portrait' : ''}`}>
    <img src={portrait ? NO_IMAGE_P : NO_IMAGE} alt="dummy video card" />
    <div className="m-card__background">
      <div className="m-card__text">
        <div className="m-card__rating"></div>
      </div>

      <div className="m-card__more"></div>
    </div>

    <div className="m-card__info">
      <div className="m-card__name">loading ..</div>
    </div>
  </div>
);
