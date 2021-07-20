import React from 'react';
import movieTrailer from 'movie-trailer';

import { sourceAdapter } from '../../../../utils';

export function _ButtonTrailer({
  movie = sourceAdapter([1])[0],
  hook: [trailerUrl, setTrailerUrl]
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

  return movie.video ? (
    <button
      className="banner__button"
      disabled={movie.video === 'no trailer'}
      onClick={() => setTrailerUrl(movie.video)}
    >
      <i className="fa fa-play"></i> Trailer
    </button>
  ) : (
    <button
      className="banner__button"
      onClick={() => {
        searchTrailer();
      }}
    >
      <i className="fa fa-search"></i> Trailer
    </button>
  );
}

const ButtonTrailer = React.memo(_ButtonTrailer);
export default ButtonTrailer;
