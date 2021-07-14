import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { productCreateActions } from "../ProductSlice";
import UTube from "./UTube";
import { VideoButtons } from "./VideoButtons";
import { createProduct } from "../../../Controllers/productActions";

import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import { EXAMPLE_MOVIES, NO_IMAGE } from "../../../constants";

export default function VideoBanner({ source }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userSignin);
  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const history = useHistory();
  const [trailerUrl, setTrailerUrl] = useState("");
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const mov = source || EXAMPLE_MOVIES;
    const random = mov[(Math.random() * mov.length) | 0];
    setMovie(random);
  }, [source]);

  useEffect(() => {
    if (successCreate) {
      dispatch(productCreateActions._RESET());
      history.push(`/product/${createdProduct._id}/edit`);
    }
  }, [createdProduct, dispatch, history, successCreate]);

  const createHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <header
        className={"banner" + (movie?.image ? "" : " no-image")}
        style={{
          backgroundSize: "cover",
          backgroundImage: `url("${
            movie?.image ? movie.image.split("^")[1] : NO_IMAGE
          }")`,
          backgroundPosition: "center center",
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">{movie?.name}</h1>

          <div className="banner__buttons">
            <VideoButtons
              movie={movie}
              trailerUrl={trailerUrl}
              setTrailerUrl={setTrailerUrl}
            />

            <button
              className="banner__button mh-2"
              disabled={!userInfo?.isSeller}
              onClick={createHandler}
            >
              Sell This Movie
            </button>
          </div>

          <h1 className="banner__description">
            {movie?.description ? movie.description.slice(0, 150) + ".." : ""}
          </h1>
        </div>

        <div className="banner--fade-bottom" />
      </header>

      <LoadingBox xl hide={!loadingCreate} />
      <MessageBox variant="danger" msg={errorCreate} />

      <UTube trailerUrl={trailerUrl} />
    </>
  );
}

export function VideoBannerBottom({ source }) {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const mov = source || EXAMPLE_MOVIES;
    const random = mov[(Math.random() * mov.length) | 0];
    setMovie(random);
  }, [source]);

  return (
    <div
      className={"banner" + (movie?.image ? "" : " no-image")}
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("${
          movie?.image ? movie.image.split("^")[1] : NO_IMAGE
        }")`,
        backgroundPosition: "center 0",
      }}
    >
      <div className="banner--fade-top" />
      <div className="banner__contents">
        <h1 className="banner__title">{movie?.name}</h1>
      </div>
    </div>
  );
}
