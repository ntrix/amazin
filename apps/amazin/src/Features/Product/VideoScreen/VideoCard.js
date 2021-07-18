import React from 'react';
import Rating from '../../../components/Rating';
import { NO_IMAGE } from '../../../constants';
import { getImgUrl } from '../../../utils';
import { VideoButtons } from './VideoButtons';

export default function VideoCard({
  movie,
  portrait,
  trailerUrl,
  setTrailerUrl
}) {
  return (
    <div className={'m-card' + (portrait ? ' m-card--portrait' : '')}>
      <img
        src={getImgUrl(
          movie._id,
          movie.image ? movie.image.split('^')[1 - portrait] : NO_IMAGE
        )}
        alt={movie.name}
      />

      <div className="m-card__background">
        <div className="m-card__text">
          {movie?.description.slice(0, 150) + '..'}
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
  );
}
