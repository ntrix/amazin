/* dummy data for waiting at first load */
import React, { useEffect, useState } from "react";
import UTube, { VideoButtons } from "./VideoButtons";

const dummy = [
  {
    name: "Stranger Things",
    images: [
      "https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
    ],
    description:
      "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
  },
  {
    name: "The Queen's Gambit",
    images: [
      "https://image.tmdb.org/t/p/original/34OGjFEbHj0E3lE2w0iTUVq0CBz.jpg",
    ],
    description:
      "In a Kentucky orphanage in the 1950s, a young girl discovers an astonishing talent for chess while struggling with addiction.",
  },
];

export default function VideoBanner({ source, isSeller }) {
  const [trailerUrl, setTrailerUrl] = useState("");
  const [movie, setMovie] = useState(dummy[(Math.random() * dummy.length) | 0]);

  useEffect(() => {
    const random = source[(Math.random() * source.length) | 0];
    setMovie(random);

    console.log(random.name, random.video, movie.name, movie.video);
  }, [source]);

  return (
    movie && (
      <>
        <header
          className="banner"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url("${movie.images ? movie.images[0] : ""}")`,
            backgroundPosition: "center center",
          }}
        >
          <div className="banner__contents">
            <h1 className="banner__title">{movie.name}</h1>

            <div className="banner__buttons">
              <VideoButtons
                movie={movie} //{{ ...movie, video: hasTrailer }}
                trailerUrl={trailerUrl}
                setTrailerUrl={setTrailerUrl}
                isSeller={isSeller}
              />
            </div>

            <h1 className="banner__description">
              {movie?.description?.slice(0, 150) + ".."}
            </h1>
          </div>

          <div className="banner--fadeBottom" />
        </header>

        <UTube trailerUrl={trailerUrl} />
      </>
    )
  );
}
