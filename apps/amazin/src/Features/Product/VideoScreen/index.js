import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listProducts } from '../../../Controllers/productActions';
import VideoBanner, { VideoBannerBottom } from './VideoBanner';
import VideoRow from './VideoRow';
import './videoScreen.css';

import MessageBox from '../../../components/MessageBox';
import LoadingOrError from '../../../components/LoadingOrError';
import { NO_MOVIES, TRENDING, TOP_RATED, SOURCES } from '../../../constants';
import { dummyMovies, sourceAdapter } from '../../../utils';

const navLabels = Object.keys(SOURCES);
navLabels.splice(1, 0, 'Home', 'STORE');

export default function VideoScreen() {
  const dispatch = useDispatch();
  const [genre, setGenre] = useState('STORE');
  const [movies, setMovies] = useState({ STORE: [] });
  const [externMovies, setExternMovies] = useState({});
  const [storeMovies, setStoreMovies] = useState();
  const productList = useSelector((state) => state.productList);
  const isMounted = useRef(true);

  useEffect(() => {
    dispatch(
      listProducts({
        seller: process.env.REACT_APP_SELLER,
        category: 'Video',
        pageSize: 11,
        order: 'oldest'
      })
    );

    (async function fetchData() {
      const promiseReturns = await Promise.all(
        Object.keys(SOURCES).map(async (_genre) => {
          const { data } = await axios
            .get('https://api.themoviedb.org/3' + SOURCES[_genre])
            .catch();
          return [[_genre], data.results];
        })
      );
      if (!isMounted.current) return;
      const movieObj = {};
      promiseReturns.map(
        ([_genre, list]) => (movieObj[_genre] = sourceAdapter(list))
      );
      setExternMovies(movieObj);
    })();
    return () => (isMounted.current = false); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setStoreMovies(productList.products);
  }, [productList.products]);

  useEffect(() => {
    setMovies({ ...externMovies, STORE: storeMovies });
  }, [externMovies, storeMovies]);

  return (
    <div className="container--full video-screen">
      <header className="m-header">
        <ul className="m-nav">
          {navLabels.map((label, id) => (
            <li
              key={id}
              className={label === genre ? ' active' : ''}
              onClick={() => setGenre(label)}
            >
              {label.split(' ')[0]}
            </li>
          ))}
        </ul>
      </header>

      <VideoBanner source={!productList.success ? NO_MOVIES : movies[genre]} />

      {externMovies &&
        Object.keys(SOURCES).map(
          (label, id) =>
            (label === genre || genre === 'Home') && (
              <VideoRow
                key={id}
                title={label}
                movies={movies[label]}
                portrait={label === 'NETFLUX ORIGINALS'}
              />
            )
        )}

      <LoadingOrError xl statusOf={productList} />

      {productList.success && (
        <>
          <MessageBox show={!productList.products.length}>
            No Product Found Or All Movies In Stock Are Sold Out
          </MessageBox>

          {productList.products.length && (
            <VideoRow
              title="IN STOCK: READY TO BUY"
              movies={[storeMovies, dummyMovies][!!productList.loading]}
              //if Netflux is genre, only one portrait row
              portrait={genre !== 'NETFLUX ORIGINALS'}
            />
          )}
        </>
      )}

      {
        /* no duplicated Trending Now */
        externMovies[TRENDING] && genre !== TRENDING && (
          <VideoRow title={TRENDING} movies={externMovies[TRENDING]} />
        )
      }

      {externMovies[TOP_RATED] && genre !== TOP_RATED && (
        <VideoRow title={TOP_RATED} movies={externMovies[TOP_RATED]} />
      )}
      <div className="banner__divider"></div>

      <VideoBannerBottom
        source={!productList.success ? NO_MOVIES : movies[genre]}
      />
    </div>
  );
}
