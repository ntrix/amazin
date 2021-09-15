import { memo } from 'react';
import movieTrailer from 'movie-trailer';

import { dummyMovies } from 'src/utils';

type PropType = {
  movie?: MovieType;
  trailerUrl: string;
  setTrailerUrl: SetState;
};

function ButtonTrailer({ movie = dummyMovies[0], trailerUrl, setTrailerUrl }: PropType) {
  const searchTrailer = async () => {
    if (trailerUrl) setTrailerUrl('');
    else
      movieTrailer(movie.name)
        .then((url: string) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'));
        })
        .catch(() => setTrailerUrl(-1));
  };

  if (trailerUrl)
    return (
      <button className="banner__button" onClick={() => setTrailerUrl('')}>
        <i className="fa fa-stop"></i> Close
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
