import axios from 'axios';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useDispatch, useSelector } from 'react-redux';

import { listProducts } from '../../../Controllers/productActions';
import './videoScreen.css';

import MessageBox from '../../../components/MessageBox';
import LoadingOrError from '../../../components/LoadingOrError';
import { TRENDING, TOP_RATED, VIDEO } from '../../../constants';
import { dummyMovies, sourceAdapter } from '../../../utils';

import {
  ErrorFallback,
  loadingFallback,
  bannerFallback,
  delay
} from '../../../components/Fallbacks';

const VideoNavHeader = React.lazy(() =>
  import(/* webpackPrefetch: true */ './VideoNavHeader')
);
const VideoBanner = React.lazy(() =>
  import(/* webpackPrefetch: true */ './components/VideoBanner')
);
const VideoRow = React.lazy(() =>
  import(/* webpackPrefetch: true */ './VideoRow').then(delay(3000))
);

export default function VideoScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const productCreate = useSelector((state) => state.productCreate);

  const [active, setActive] = useState('STORE');
  const [movies, setMovies] = useState({ STORE: [] });
  const [externMovies, setExternMovies] = useState({});
  const [storeMovies, setStoreMovies] = useState();
  const [bannerMovies, setBannerMovies] = useState([]);

  const isMounted = useRef(true);

  useEffect(() => {
    const _banner = {};
    VIDEO.GENRES.forEach((_genre) => {
      const genreMovies = !productList.success
        ? VIDEO.EMPTY
        : movies[_genre] || VIDEO.EXAMPLES;
      _banner[_genre] = genreMovies[(Math.random() * genreMovies.length) | 0];
    });
    setBannerMovies(_banner);
  }, [productList.success, movies]);

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
        Object.keys(VIDEO.SRC).map(async (genre) => {
          const { data } = await axios
            .get(VIDEO.URL + VIDEO.SRC[genre])
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
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={loadingFallback}>
          <VideoNavHeader labels={VIDEO.GENRES} hook={[active, setActive]} />
        </Suspense>

        <LoadingOrError xl statusOf={productCreate} />

        <Suspense fallback={bannerFallback}>
          <VideoBanner movie={bannerMovies[active]} youtubeTrailer />
        </Suspense>

        <Suspense fallback={loadingFallback}>
          {!!externMovies &&
            Object.keys(VIDEO.SRC).map(
              (_genre, id) =>
                (_genre === active || active === 'Home') && (
                  <VideoRow
                    key={id}
                    title={_genre}
                    movies={movies[_genre]}
                    portrait={_genre === 'NETFLUX ORIGINALS'}
                  />
                )
            )}

          <LoadingOrError xl statusOf={productList} />
          {productList?.success && (
            <>
              <MessageBox show={productList?.products?.length < 1}>
                Sold Out/ No Product Found
              </MessageBox>

              {productList?.products?.length && (
                <VideoRow
                  title="IN STOCK: READY TO BUY"
                  movies={[storeMovies, dummyMovies][!!productList.loading]}
                  //if Netflux is active, only one portrait row
                  portrait={active !== 'NETFLUX ORIGINALS'}
                />
              )}
            </>
          )}

          {
            /* no duplicated Trending Now */
            externMovies[TRENDING] && active !== TRENDING && (
              <VideoRow title={TRENDING} movies={externMovies[TRENDING]} />
            )
          }

          {externMovies[TOP_RATED] && active !== TOP_RATED && (
            <VideoRow title={TOP_RATED} movies={externMovies[TOP_RATED]} />
          )}
        </Suspense>
        <div className="banner__divider"></div>

        <Suspense fallback={loadingFallback}>
          <VideoBanner bottom movie={bannerMovies[active]} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
