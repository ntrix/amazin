/* dummyBanners data for waiting at first load */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import { createProduct } from "../../../Controllers/productActions";
import { productCreateActions } from "../ProductSlice";
import UTube, { VideoButtons } from "./VideoButtons";
import { dummyBanners, NO_IMAGE } from "../../../utils";

export default function VideoBanner({ source = dummyBanners, noButtons }) {
  const [trailerUrl, setTrailerUrl] = useState("");
  const [movie, setMovie] = useState(
    dummyBanners[(Math.random() * dummyBanners.length) | 0]
  );

  useEffect(() => {
    const random = source[(Math.random() * source.length) | 0];
    setMovie(random);
  }, [source]);

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const history = useHistory();
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
        className="banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url("${
            movie?.images ? movie.images[0] : NO_IMAGE
          }")`,
          backgroundPosition: "center center",
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">{movie?.name}</h1>

          <div className="banner__buttons">
            <VideoButtons
              movie={movie} //{{ ...movie, video: hasTrailer }}
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
            {movie?.description?.slice(0, 150) + ".."}
          </h1>
        </div>

        <div className="banner--fade-bottom" />
      </header>

      {loadingCreate && <LoadingBox xl />}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}

      <UTube trailerUrl={trailerUrl} />
    </>
  );
}

export function VideoBannerBottom({ source = dummyBanners }) {
  const [movie, setMovie] = useState(
    dummyBanners[(Math.random() * dummyBanners.length) | 0]
  );

  useEffect(() => {
    const random = source[(Math.random() * source.length) | 0];
    setMovie(random);
  }, [source]);

  return (
    movie?.images && (
      <div
        className="banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url("${movie.images ? movie.images[0] : ""}")`,
          backgroundPosition: "center 0",
        }}
      >
        <div className="banner--fade-top" />
        <div className="banner__contents">
          <h1 className="banner__title">{movie.name}</h1>
        </div>
      </div>
    )
  );
}
