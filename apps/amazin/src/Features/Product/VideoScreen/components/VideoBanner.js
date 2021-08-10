import React, { useState } from 'react';
import UTube from './UTube';
import ButtonTrailer from './ButtonTrailer';

import { VIDEO } from '../../../../constants';
import ButtonSell from './ButtonSell';
import ButtonBuy from './ButtonBuy';
import { LazyBackground } from '../../../../utils/suspenseClient';

export function _VideoBanner({ movie, bottom = false }) {
  const [trailerUrl, setTrailerUrl] = useState('');

  return (
    <>
      <LazyBackground
        className={`banner ${movie?.image ? '' : 'no-image'}`}
        src={movie?.image ? movie.image.split('^')[1] : VIDEO.BANNER}
        style={{
          backgroundSize: 'cover',
          backgroundPosition: `center ${bottom ? '0' : 'center'}`
        }}
      >
        {bottom && <div className="banner--fade-top" />}
        <div className="banner__contents">
          <h1 className="banner__title">{movie?.name}</h1>

          {!bottom && (
            <>
              <div className="banner__buttons">
                <ButtonTrailer
                  movie={movie}
                  hook={[trailerUrl, setTrailerUrl]}
                />

                <ButtonBuy movie={movie} />

                <ButtonSell />
              </div>

              <h1 className="banner__description">
                {movie?.description
                  ? movie.description.slice(0, 150) + '..'
                  : ''}
              </h1>
            </>
          )}
        </div>

        {!bottom && <div className="banner--fade-bottom" />}
      </LazyBackground>

      {!bottom && <UTube trailerUrl={trailerUrl} />}
    </>
  );
}

const VideoBanner = React.memo(_VideoBanner);
export default VideoBanner;
