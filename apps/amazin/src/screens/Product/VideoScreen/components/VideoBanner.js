import { memo, useState } from 'react';

import { VIDEO } from 'src/constants';
import { LazyBackground } from 'src/utils/suspenseClient';
import UTube from './UTube';
import ButtonBuy from './ButtonBuy';
import ButtonSell from './ButtonSell';
import ButtonTrailer from './ButtonTrailer';

function VideoBanner({ movie, bottom = false, youtubeTrailer = false }) {
  const [trailerUrl, setTrailerUrl] = useState('');
  const description = movie?.description ? movie.description.slice(0, 150) + '..' : '';

  return (
    <>
      <LazyBackground
        className={`banner ${movie?.image ? '' : 'no-image'}`}
        src={movie?.image?.split('^')[1] ?? VIDEO.BANNER}
        style={{
          backgroundSize: 'cover',
          backgroundPosition: `center ${bottom ? '0' : 'center'}`
        }}
      >
        {!!bottom && <div className="banner--fade-top" />}
        <div className="banner__contents">
          <h1 className="banner__title">{movie?.name}</h1>

          {!bottom && (
            <>
              <div className="banner__buttons">
                <ButtonTrailer movie={movie} hook={[trailerUrl, setTrailerUrl]} />
                <ButtonBuy movie={movie} />
                <ButtonSell />
              </div>
              <h1 className="banner__description">{description}</h1>
            </>
          )}
        </div>
        {!bottom && <div className="banner--fade-bottom" />}
      </LazyBackground>
      {!!youtubeTrailer && <UTube trailerUrl={trailerUrl} />}
    </>
  );
}

export default memo(VideoBanner);
