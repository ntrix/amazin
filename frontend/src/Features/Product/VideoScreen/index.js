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
  Store: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
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
  const [genre, setGenre] = useState("Netflix");
  useEffect(() => {
    dispatch(listProducts({ seller: process.env.VIDEO_SELLER }));
  }, [dispatch]);
  return (
    <div className="container--fluid video-screen">
      <header className="m-header">
        <ul className="m-nav">
          {Object.keys(source).map((nav) => (
            <li
              className={nav === genre ? " active" : ""}
              onClick={() => setGenre(nav)}
            >
              {nav.split(" ")[0]}
            </li>
          ))}
        </ul>
      </header>
      <Banner source={source[genre]} />
      {Object.keys(source).map((nav) =>
        ((genre === "Home" && nav !== "Home") || nav === genre) &&
        nav !== "Store" ? (
          <Row
            title={nav}
            source={source[nav]}
            large={nav === "NETFLIX ORIGINALS"}
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

function Banner({ source }) {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(source);
      setMovie(request.data.results[Math.floor(Math.random() * 11)]);
      return request;
    }
    fetchData();
  }, [source]);

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
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  );
}
