import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { productCreateActions } from '../ProductSlice';
import UTube from './UTube';
import { VideoButtons } from './VideoButtons';
import { createProduct } from '../../../Controllers/productActions';

import { EXAMPLE_MOVIES, NO_IMAGE } from '../../../constants';
import LoadingOrError from '../../../components/LoadingOrError';

export function _VideoBanner({ source }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userSignin);
  const productCreate = useSelector((state) => state.productCreate);

  const history = useHistory();
  const [trailerUrl, setTrailerUrl] = useState('');
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const mov = source || EXAMPLE_MOVIES;
    const random = mov[(Math.random() * mov.length) | 0];
    setMovie(random);
  }, [source]);

  useEffect(() => {
    if (productCreate.success) {
      dispatch(productCreateActions._RESET());
      history.push(`/product/${productCreate.product._id}/edit`);
    }
  }, [productCreate.product, dispatch, history, productCreate.success]);

  const createHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <header
        className={'banner' + (movie?.image ? '' : ' no-image')}
        style={{
          backgroundSize: 'cover',
          backgroundImage: `url("${
            movie?.image ? movie.image.split('^')[1] : NO_IMAGE
          }")`,
          backgroundPosition: 'center center'
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
            {movie?.description ? movie.description.slice(0, 150) + '..' : ''}
          </h1>
        </div>

        <div className="banner--fade-bottom" />
      </header>

      <LoadingOrError xl statusOf={productCreate} />

      <UTube trailerUrl={trailerUrl} />
    </>
  );
}

export function _VideoBannerBottom({ source }) {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const mov = source || EXAMPLE_MOVIES;
    const random = mov[(Math.random() * mov.length) | 0];
    setMovie(random);
  }, [source]);

  return (
    <div
      className={'banner' + (movie?.image ? '' : ' no-image')}
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url("${
          movie?.image ? movie.image.split('^')[1] : NO_IMAGE
        }")`,
        backgroundPosition: 'center 0'
      }}
    >
      <div className="banner--fade-top" />
      <div className="banner__contents">
        <h1 className="banner__title">{movie?.name}</h1>
      </div>
    </div>
  );
}

export const VideoBannerBottom = React.memo(_VideoBannerBottom);

const VideoBanner = React.memo(_VideoBanner);
export default VideoBanner;
