import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import { listProducts } from "../../../Controllers/productActions";
import { dummyMovies, sourceAdapter } from "../../../utils";
import VideoBanner, { VideoBannerBottom } from "./VideoBanner";
import VideoRow from "./VideoRow";
import "./videoScreen.css";

const API_KEY = process.env.REACT_APP_API_KEY;
const sources = {
  "NETFLUX ORIGINALS": `/discover/tv?api_key=${API_KEY}&with_networks=213`,
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

export default function VideoScreen() {
  const dispatch = useDispatch();
  const [genre, setGenre] = useState("STORE");
  const [movies, setMovies] = useState({});
  const {
    loading: loadingProducts,
    error: errorProducts,
    success: successProducts,
    products,
  } = useSelector((state) => state.productList);

  useEffect(() => {
    async function fetchData() {
      const movieArray = await Promise.all(
        Object.keys(sources).map(async (genre) => {
          const { data } = await axios
            .get("https://api.themoviedb.org/3" + sources[genre])
            .catch((e) => console.log(e));
          return [[genre], data.results];
        })
      );
      const movieObj = {};
      movieArray.map(
        ([genre, list]) => (movieObj[genre] = sourceAdapter(list))
      );
      setMovies(movieObj);
    }
    if (!movies[genre]) fetchData(); // else shuffle random movies list :)
  }, []);

  useEffect(() => {
    dispatch(
      listProducts({
        seller: process.env.REACT_APP_SELLER,
        category: "Video",
        pageSize: 11,
      })
    );
    if (successProducts)
      setMovies({ ...movies, STORE: sourceAdapter(products).reverse() });
  }, [dispatch, successProducts]);

  return (
    <div className="container--full video-screen">
      <header className="m-header">
        <ul className="m-nav">
          {Object.keys(sources).map((label, id) => (
            <li
              key={id}
              className={label === genre ? " active" : ""}
              onClick={() => setGenre(label)}
            >
              {label.split(" ")[0]}
            </li>
          ))}
        </ul>
      </header>
      <VideoBanner
        source={genre === "STORE" ? sourceAdapter(products) : movies[genre]}
      />
      {Object.keys(sources).map(
        (label, id) =>
          label !== "Home" &&
          (genre === label || genre === "Home") &&
          label !== "STORE" && (
            <VideoRow
              key={id}
              title={label}
              movies={movies[label]}
              large={label === "NETFLUX ORIGINALS"}
            />
          )
      )}
      {loadingProducts ? (
        <LoadingBox xl />
      ) : errorProducts ? (
        <MessageBox variant="danger">{errorProducts}</MessageBox>
      ) : (
        <>
          {products.length === 0 && (
            <MessageBox>
              No Product Found Or All Movies In Stock Are Sold Out
            </MessageBox>
          )}
        </>
      )}
      <VideoRow
        title="IN STOCK: READY TO BUY"
        movies={sourceAdapter(products || dummyMovies).reverse()}
        //if Netflux is there, only one large row
        large={genre !== "NETFLUX ORIGINALS"}
      />
      {
        movies["Trending Now"] && genre !== "Trending Now" && (
          <VideoRow title="Trending Now" movies={movies["Trending Now"]} />
        ) /* no duplicated Trending Now*/
      }
      {movies["Top Rated"] && genre !== "Top Rated" && (
        <VideoRow title="Top Rated" movies={movies["Top Rated"]} />
      )}
      <div className="banner__divider"></div>
      <VideoBannerBottom source={movies[genre] || dummyMovies} />
    </div>
  );
}
