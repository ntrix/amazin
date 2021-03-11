import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import Product from "../../../components/Product";
import { listProducts } from "../../../Controllers/productActions";
import axios from "./axios";
import Row, { RowToBuy, truncate } from "./Row";
import "./videoScreen.css";

const API_KEY = "f81980ff410e46f422d64ddf3a56dddd"; //process.env.API_KEY;

const source = {
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

export default function VideoScreen(props) {
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const productList = useSelector((state) => state.productList);
  const {
    loading: loadingProducts,
    error: errorProducts,
    products,
  } = productList;

  const dispatch = useDispatch();
  const [genre, setGenre] = useState("STORE");
  useEffect(() => {
    dispatch(listProducts({ seller: process.env.VIDEO_SELLER }));
  }, [dispatch]);
  return (
    <div className="container--fluid video-screen">
      <header className="m-header">
        <ul className="m-nav">
          {Object.keys(source).map((label) => (
            <li
              className={label === genre ? " active" : ""}
              onClick={() => setGenre(label)}
            >
              {label.split(" ")[0]}
            </li>
          ))}
        </ul>
      </header>
      <Banner source={source[genre]} products={products} />
      {Object.keys(source).map((label) =>
        ((genre === "Home" && label !== "Home") || label === genre) &&
        label !== "STORE" ? (
          <Row
            title={label}
            source={source[label]}
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
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <RowToBuy
            title="IN STOCK: READY TO BUY"
            movies={products}
            large={
              /*if Netflix is there, only one large row*/
              genre !== "NETFLIX ORIGINALS"
            }
          />
        </>
      )}
      {
        genre !== "Trending Now" && (
          <Row title="Trending Now" source={source["Trending Now"]} />
        ) /* no duplicated Trending Row*/
      }
      {genre !== "Top Rated" && (
        <Row title="Top Rated" source={source["Top Rated"]} />
      )}
    </div>
  );
}

const placeholder = [
  {
    name: "Stranger Things",
    poster_path: "56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
    overview:
      "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
  },
  {
    name: "The Queen's Gambit",
    poster_path: "34OGjFEbHj0E3lE2w0iTUVq0CBz.jpg",
    overview:
      "In a Kentucky orphanage in the 1950s, a young girl discovers an astonishing talent for chess while struggling with addiction.",
  },
];
/* dummy data for waiting at first load */

function Banner({ source = "", products = [] }) {
  const [movie, setMovie] = useState([]);
  const [isAvailable, setAvailable] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(source).catch((e) => "");
      setMovie(
        request
          ? request.data.results[
              (Math.random() * request.data.results.length) | 0
            ]
          : placeholder[(Math.random() * placeholder.length) | 0]
      );
      const name =
        movie?.title ||
        movie?.name ||
        movie?.original_title ||
        movie?.original_name;
      setAvailable(products.filter((p) => p.name === name).length);
      return request;
    }
    fetchData();
  }, [source, products]);

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
          "https://image.tmdb.org/t/p/original/${
            movie?.backdrop_path || movie?.poster_path || ""
          }"
        )`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title ||
            movie?.name ||
            movie?.original_title ||
            movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Trailer</button>
          <button
            className={"banner__button" + (isAvailable ? "" : " disabled")}
          >
            Rent/Buy
          </button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  );
}
