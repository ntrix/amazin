import { memo } from 'react';
import movieTrailer from 'movie-trailer';

import { dummyMovies } from 'src/utils';
import { VIDEO, VideoType } from 'src/constants';

export type ButtonTrailerProps = {
  movie?: VideoType & ProductType;
  trailerUrl: string;
  setTrailerUrl: SetStateType<string>;
};

function ButtonTrailer({ movie = dummyMovies[0], trailerUrl, setTrailerUrl }: ButtonTrailerProps) {
  const searchTrailer = () => {
    if (trailerUrl) setTrailerUrl('');
    else
      movieTrailer(movie.name)
        .then((url: string) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v') ?? VIDEO.DUMMY_TRAILER);
        })
        .catch(() => setTrailerUrl('error'));
  };

  if (trailerUrl)
    return (
      <button className="banner__button" onClick={() => setTrailerUrl('')}>
        <i className="fa fa-stop" /> Close
      </button>
    );

  return (
    <button
      className="banner__button"
      disabled={movie.video === 'no trailer'}
      onClick={() => (movie.video ? setTrailerUrl(movie.video) : searchTrailer())}
    >
      <i className={`fa fa-${movie.video ? 'play' : 'search'}`} /> Trailer
    </button>
  );
}

export default memo(ButtonTrailer);
