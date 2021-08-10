import axios from 'axios';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useDispatch, useSelector } from 'react-redux';

import { listProducts } from '../../../Controllers/productActions';
import './videoScreen.css';

import MessageBox from '../../../components/MessageBox';
import LoadingOrError from '../../../components/LoadingOrError';
import {
  TRENDING,
  TOP_RATED,
  VIDEO,
  NETFLUX,
  HOME,
  STORE
} from '../../../constants';
import { sourceAdapter } from '../../../utils';

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

  const [active, setActive] = useState(STORE);
  const [externMovies, setExternMovies] = useState({});
  const [storeMovies, setStoreMovies] = useState([]);
  const [bannerMovies, setBannerMovies] = useState([]);

  const isMounted = useRef(true);

  useEffect(() => {
    const _banner = {};
    VIDEO.GENRES.forEach((_genre) => {
      const genreMovies = !productList.success
        ? VIDEO.EMPTY
        : externMovies[_genre] || storeMovies || VIDEO.EXAMPLES;
      _banner[_genre] = genreMovies[(Math.random() * genreMovies.length) | 0];
    });
    setBannerMovies(_banner);
  }, [productList.success, externMovies, storeMovies]);

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
      const _movieList = {};
      await Promise.all(
        Object.keys(VIDEO.SRC).map(async (genre) => {
          const { data } = await axios
            .get(VIDEO.URL + VIDEO.SRC[genre])
            .catch();
          _movieList[genre] = sourceAdapter(data.results);
        })
      );
      if (isMounted.current) setExternMovies(_movieList);
    })();

    return () => (isMounted.current = false); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setStoreMovies(productList.products);
  }, [productList.products]);

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
            (active === HOME ? (
              Object.keys(VIDEO.SRC).map((_genre) => (
                <VideoRow
                  key={_genre}
                  title={_genre}
                  movies={externMovies[_genre]}
                  portrait={_genre === NETFLUX}
                />
              ))
            ) : (
              <VideoRow
                title={active}
                movies={externMovies[active]}
                portrait={active === NETFLUX}
              />
            ))}

          <LoadingOrError xl statusOf={productList} />
          <MessageBox show={productList?.success && storeMovies?.length < 1}>
            Sold Out/ No Product Found
          </MessageBox>
          <VideoRow
            title="IN STOCK: READY TO BUY"
            movies={storeMovies}
            portrait={active !== NETFLUX}
          />

          {active !== TRENDING && (
            <VideoRow title={TRENDING} movies={externMovies[TRENDING]} />
          )}

          {active !== TOP_RATED && (
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
