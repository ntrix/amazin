import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import { listProducts } from "../../../Controllers/productActions";
import axios from "./axios";
import Row, { truncate } from "./Row";
import "./videoScreen.css";

const API_KEY = process.env.REACT_APP_API_KEY;
const sources = {
  "NETFLIX ORIGINALS": `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  Home: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  STORE: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  "Action Movies": `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  "Comedy Movies": `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  "Horror Movies": `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  "Romance Movies": `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  Documentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  "Trending Now": `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  "Top Rated": `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
};
const baseURL = "https://image.tmdb.org/t/p/original/";

export default function VideoScreen() {
  const dispatch = useDispatch();
  const [genre, setGenre] = useState("STORE");
  const [movies, setMovies] = useState({});
  const [stock, setStock] = useState([]);
  const {
    loading: loadingProducts,
    error: errorProducts,
    products,
  } = useSelector((state) => state.productList);

  const adapter = (m) => ({
    name: m.name || m.title || m.original_title || m.original_name || "",
    images: [
      m.backdrop_path ? baseURL + m.backdrop_path : m.image?.split("^")[1],
      m.poster_path ? baseURL + m.poster_path : m.image?.split("^")[0],
    ],
    rating: m.rating * 2 || m.vote_average,
    numReviews: m.numReviews || m.vote_count,
    description: m.description || m.overview,
    video: m.video,
    seller: m.seller,
    _id: m._id,
  });

  useEffect(() => {
    async function fetchData() {
      const movieArray = await Promise.all(
        Object.keys(sources).map(async (genre) => {
          const { data } = await axios
            .get(sources[genre])
            .catch((e) => console.log(e));
          return [[genre], data.results];
        })
      );
      const movieObj = {};
      movieArray.map(([genre, list]) => (movieObj[genre] = list.map(adapter)));
      setMovies(movieObj);
    }
    if (!movies[genre]) fetchData(); // else shuffle random movies list :)
    dispatch(
      listProducts({ seller: process.env.REACT_APP_SELLER, pageSize: 11 })
    );
    if (products) setStock(products.map(adapter).reverse());
  }, [genre, dispatch]);
  return (
    <div className="container--fluid video-screen">
      <header className="m-header">
        <ul className="m-nav">
          {Object.keys(sources).map((label) => (
            <li
              key={label}
              className={label === genre ? " active" : ""}
              onClick={() => setGenre(label)}
            >
              {label.split(" ")[0]}
            </li>
          ))}
        </ul>
      </header>
      {movies[genre] && <Banner source={movies[genre]} stock={stock} />}
      {movies[genre] &&
        Object.keys(sources).map((label) =>
          label !== "Home" &&
          (genre === label || genre === "Home") &&
          label !== "STORE" ? (
            <Row
              title={label}
              movies={movies[label]}
              large={label === "NETFLIX ORIGINALS"}
            />
          ) : (
            <></>
          )
        )}
      {loadingProducts ? (
        <LoadingBox size="xl" />
      ) : errorProducts ? (
        <MessageBox variant="danger">{errorProducts}</MessageBox>
      ) : (
        <>
          {products.length === 0 && (
            <MessageBox>
              No Product Found Or All Movies In Stock Are Sold Out
            </MessageBox>
          )}
          <Row
            title="IN STOCK: READY TO BUY"
            movies={stock}
            //if Netflix is there, only one large row
            large={genre !== "NETFLIX ORIGINALS"}
          />
        </>
      )}
      {
        movies["Trending Now"] && genre !== "Trending Now" && (
          <Row title="Trending Now" movies={movies["Trending Now"]} />
        ) /* no duplicated Trending Row*/
      }
      {movies["Top Rated"] && genre !== "Top Rated" && (
        <Row title="Top Rated" movies={movies["Top Rated"]} />
      )}
    </div>
  );
}
/* dummy data for waiting at first load */
const placeholder = [
  {
    name: "Stranger Things",
    images: [, baseURL + "56v2KjBlU4XaOv9rVYEQypROD7P.jpg"],
    description:
      "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
  },
  {
    name: "The Queen's Gambit",
    images: [, baseURL + "34OGjFEbHj0E3lE2w0iTUVq0CBz.jpg"],
    description:
      "In a Kentucky orphanage in the 1950s, a young girl discovers an astonishing talent for chess while struggling with addiction.",
  },
];
function Banner({ source = placeholder, stock = [] }) {
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
          {truncate(movie?.description, 150)}
        </h1>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  );
}
