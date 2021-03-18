/* dummy data for waiting at first load */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import { createProduct } from "../../../Controllers/productActions";
import { productCreateActions } from "../ProductSlice";
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

export default function VideoBanner({ source = dummy }) {
  const [trailerUrl, setTrailerUrl] = useState("");
  const [movie, setMovie] = useState(dummy[(Math.random() * dummy.length) | 0]);

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

          <div className="banner--fadeBottom" />
        </header>

        {loadingCreate && <LoadingBox xl />}
        {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}

        <UTube trailerUrl={trailerUrl} />
      </>
    )
  );
}
