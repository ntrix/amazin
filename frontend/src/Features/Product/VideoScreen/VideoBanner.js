/* dummy data for waiting at first load */
import React, { useEffect, useState } from "react";

const placeholder = [
  {
    name: "Stranger Things",
    images: [
      ,
      "https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
    ],
    description:
      "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
  },
  {
    name: "The Queen's Gambit",
    images: [
      ,
      "https://image.tmdb.org/t/p/original/34OGjFEbHj0E3lE2w0iTUVq0CBz.jpg",
    ],
    description:
      "In a Kentucky orphanage in the 1950s, a young girl discovers an astonishing talent for chess while struggling with addiction.",
  },
];

export default function VideoBanner({ source = placeholder, stock = [] }) {
  const [movie, setMovie] = useState("");
  const [isAvailable, setAvailable] = useState(0);

  useEffect(() => {
    setMovie(source[(Math.random() * source.length) | 0]);
    setAvailable(stock.filter((p) => p.name === movie.name).length);
  }, [source]);

  return (
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
          <button className="banner__button">Trailer</button>
          <button className="banner__button">Add to List</button>
          <button
            className={"banner__button" + (isAvailable ? "" : " disabled")}
          >
            Rent[Buy]
          </button>
        </div>
        <h1 className="banner__description">
          {movie?.description?.slice(0, 150) + ".."}
        </h1>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  );
}
