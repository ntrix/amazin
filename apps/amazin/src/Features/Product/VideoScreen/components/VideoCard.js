import React from 'react';
import Rating from '../../../../components/Rating';
import { NO_IMAGE } from '../../../../constants';
import { getImgUrl } from '../../../../utils';
import ButtonBuy from './ButtonBuy';
import ButtonTrailer from './ButtonTrailer';
import Img from '../../../../utils/suspenseResource';

export function _VideoCard({ movie, portrait, trailerUrl, setTrailerUrl }) {
  return (
    <div className={`m-card ${portrait ? 'm-card--portrait' : ''}`}>
      <Img
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
          <ButtonTrailer movie={movie} hook={[trailerUrl, setTrailerUrl]} />

          <ButtonBuy movie={movie} />
        </div>
      </div>

      <div className="m-card__info">
        <div className="m-card__name">{movie.name}</div>
      </div>
    </div>
  );
}

const VideoCard = React.memo(_VideoCard);
export default VideoCard;
