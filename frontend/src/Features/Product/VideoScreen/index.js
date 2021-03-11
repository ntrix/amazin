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

const fetchTrending = `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflix = `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated = `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchAction = `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedy = `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorror = `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomance = `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries = `/discover/movie?api_key=${API_KEY}&with_genres=99`;

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
          {[
            "Netflix",
            "Home",
            "Action",
            "Romance",
            "Comedy",
            "Documentaries",
            "Horror",
          ].map((nav) => (
            <li
              className={nav === genre ? " active" : ""}
              onClick={() => setGenre(nav)}
            >
              {nav}
            </li>
          ))}
        </ul>
      </header>
      <Banner source={fetchNetflix} />
      {genre === "Netflix" && (
        <Row title="NETFLIX ORIGINALS" fetchUrl={fetchNetflix} isLargeRow />
      )}
      {genre === "Comedy" && (
        <Row title="Comedy Movies" fetchUrl={fetchComedy} />
      )}
      {genre === "Action" && (
        <Row title="Action Movies" fetchUrl={fetchAction} />
      )}
      {genre === "Horror" && (
        <Row title="Horror Movies" fetchUrl={fetchHorror} />
      )}
      {genre === "Romance" && (
        <Row title="Romance Movies" fetchUrl={fetchRomance} />
      )}
      {genre === "Documentaries" && (
        <Row title="Documentaries" fetchUrl={fetchDocumentaries} />
      )}
      {loadingProducts ? (
        <LoadingBox size="xl" />
      ) : errorProducts ? (
        <MessageBox variant="danger">{errorProducts}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <RowToBuy title="In Stock: Ready to Buy" movies={products} />
        </>
      )}
      <Row title="Trending Now" fetchUrl={fetchTrending} />
      <Row title="Top Rated" fetchUrl={fetchTopRated} />
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
  }, []);

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
