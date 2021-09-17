import { memo, useState } from 'react';

import { VIDEO } from 'src/constants';
import { LazyBackground } from 'src/apis/suspenseAPI';
import UTube from './UTube';
import ButtonBuy from './ButtonBuy';
import ButtonSell from './ButtonSell';
import ButtonTrailer from './ButtonTrailer';
import Header from 'src/layouts/Header';

type PropType = {
  movie?: MovieType;
  bottom?: boolean;
  youtubeTrailer?: boolean;
};

function VideoBanner({ movie, bottom = false, youtubeTrailer = false }: PropType) {
  const [trailerUrl, setTrailerUrl] = useState('');
  const description = movie?.description ? movie.description.slice(0, 150) + '..' : '';
  const backgroundPosition = `center ${bottom ? '0' : 'center'}`;

  return (
    <>
      <LazyBackground
        className={`banner ${movie?.image ? '' : 'no-image'}`}
        src={movie?.image?.split('^')[1] ?? VIDEO.BANNER}
        style={{ backgroundSize: 'cover', backgroundPosition }}
      >
        {!!bottom && <div className="banner--fade-top" />}
        <div className="banner__contents">
          <Header title className="banner__title" label={movie?.name} />

          {!bottom && (
            <>
              <div className="banner__buttons">
                <ButtonTrailer movie={movie} trailerUrl={trailerUrl} setTrailerUrl={setTrailerUrl} />
                <ButtonBuy movie={movie} />
                <ButtonSell />
              </div>
              <h4 className="banner__description">{description}</h4>
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
