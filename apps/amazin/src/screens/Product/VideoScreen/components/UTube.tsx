import YouTube from 'react-youtube';

const opts = {
  height: '390',
  width: '60%',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1 as 0 | 1 | undefined
  }
};

export default function UTube({ trailerUrl }: { trailerUrl?: string }) {
  if (!trailerUrl) return null;

  return (
    <div className="trailer__frame">
      <YouTube className="movie__trailer" videoId={trailerUrl === '-1' ? 'k4D7cuDAvXE' : trailerUrl} opts={opts} />
    </div>
  );
}
