import React from 'react';
import movieTrailer from 'movie-trailer';

import { sourceAdapter } from '../../../../utils';
const defaultMovie = sourceAdapter([1])[0];

export function _ButtonTrailer({
  movie = defaultMovie,
  trailerUrl,
  setTrailerUrl
}) {
  const searchTrailer = async () => {
    if (trailerUrl) setTrailerUrl('');
    else
      movieTrailer(movie.name)
        .then((url) => {
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
      onClick={() =>
        movie.video ? setTrailerUrl(movie.video) : searchTrailer()
      }
    >
      <i className={`fa fa-${movie.video ? 'play' : 'search'}`} /> Trailer
    </button>
  );
}

const ButtonTrailer = React.memo(_ButtonTrailer);
export default ButtonTrailer;
