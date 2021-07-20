import axios from 'axios';
import React, { useEffect, useRef, useState, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listProducts } from '../../../Controllers/productActions';
import './videoScreen.css';

import MessageBox from '../../../components/MessageBox';
import LoadingOrError from '../../../components/LoadingOrError';
import { NO_MOVIES, TRENDING, TOP_RATED, SOURCES } from '../../../constants';
import { dummyMovies, sourceAdapter } from '../../../utils';
import LoadingBox from '../../../components/LoadingBox';

import { VideoBannerBottom } from './VideoBanner';
const VideoNavHeader = React.lazy(() =>
  import(/* webpackPrefetch: true */ './VideoNavHeader')
);
const VideoBanner = React.lazy(() =>
  import(/* webpackPrefetch: true */ './VideoBanner')
);
const VideoRow = React.lazy(() =>
  import(/* webpackPrefetch: true */ './VideoRow')
);

const navLabels = Object.keys(SOURCES);
navLabels.splice(1, 0, 'Home', 'STORE');

export default function VideoScreen() {
  const dispatch = useDispatch();
  const [active, setActive] = useState('STORE');
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
        Object.keys(SOURCES).map(async (genre) => {
          const { data } = await axios
            .get('https://api.themoviedb.org/3' + SOURCES[genre])
            .catch();
          return [[genre], data.results];
        })
      );
      if (!isMounted.current) return;
      const movieObj = {};
      promiseReturns.map(
        ([genre, list]) => (movieObj[genre] = sourceAdapter(list))
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
      <Suspense fallback={<LoadingBox />}>
        <VideoNavHeader labels={navLabels} hook={[active, setActive]} />
      </Suspense>

      <Suspense fallback={<LoadingBox xl />}>
        <VideoBanner
          source={!productList.success ? NO_MOVIES : movies[active]}
        />
      </Suspense>

      <Suspense fallback={<LoadingBox />}>
        {externMovies &&
          Object.keys(SOURCES).map(
            (label, id) =>
              (label === active || active === 'Home') && (
                <VideoRow
                  key={id}
                  title={label}
                  movies={movies[label]}
                  portrait={label === 'NETFLUX ORIGINALS'}
                />
              )
          )}
      </Suspense>

      <LoadingOrError xl statusOf={productList} />

      <Suspense fallback={<LoadingBox />}>
        {productList.success && (
          <>
            <MessageBox show={!productList.products.length}>
              No Product Found Or All Movies In Stock Are Sold Out
            </MessageBox>

            {productList.products.length && (
              <VideoRow
                title="IN STOCK: READY TO BUY"
                movies={[storeMovies, dummyMovies][!!productList.loading]}
                //if Netflux is active, only one portrait row
                portrait={active !== 'NETFLUX ORIGINALS'}
              />
            )}
          </>
        )}
      </Suspense>

      <Suspense fallback={<LoadingBox />}>
        {
          /* no duplicated Trending Now */
          externMovies[TRENDING] && active !== TRENDING && (
            <VideoRow title={TRENDING} movies={externMovies[TRENDING]} />
          )
        }
      </Suspense>

      <Suspense fallback={<LoadingBox />}>
        {externMovies[TOP_RATED] && active !== TOP_RATED && (
          <VideoRow title={TOP_RATED} movies={externMovies[TOP_RATED]} />
        )}
        <div className="banner__divider"></div>
      </Suspense>

      <Suspense fallback={<LoadingBox xl />}>
        <VideoBannerBottom
          source={!productList.success ? NO_MOVIES : movies[active]}
        />
      </Suspense>
    </div>
  );
}
