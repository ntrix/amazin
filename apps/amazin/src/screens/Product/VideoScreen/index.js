import React, { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useDispatch, useSelector } from 'react-redux';

import './videoScreen.css';
import axios from 'axios';
import { listProducts } from 'src/apis/productAPI';
import { sourceAdapter } from 'src/utils';
import { TRENDING, TOP_RATED, VIDEO, NETFLUX, HOME, STORE, IN_STOCK } from 'src/constants';
import { ErrorFallback, SuspenseLoad, delay, SuspenseBanner } from 'src/components/CustomSuspense';
import { useSafeState } from 'src/hooks/useSafeState';
import MessageBox from 'src/components/MessageBox';
import LoadingOrError from 'src/components/LoadingOrError';
const VideoNavHeader = React.lazy(() => import(/* webpackPrefetch: true */ './VideoNavHeader'));
const VideoBanner = React.lazy(() => import(/* webpackPrefetch: true */ './components/VideoBanner'));
const VideoRow = React.lazy(() => import(/* webpackPrefetch: true */ './VideoRow').then(delay(3000)));

export default function VideoScreen() {
  const dispatch = useDispatch();
  const { products, success, loading, error } = useSelector((state) => state.productList);
  const productCreate = useSelector((state) => state.productCreate);
  const [active, setActive] = useState(STORE);
  const [externMovies, setExternMovies] = useSafeState({});
  const [stockMovies, setStockMovies] = useSafeState({ [IN_STOCK]: [] });
  const [bannerMovies, setBannerMovies] = useSafeState([]);

  useEffect(() => {
    const _banner = {};
    VIDEO.GENRES.forEach((_genre) => {
      const genreMovies = !success ? VIDEO.EMPTY : externMovies[_genre] || stockMovies[IN_STOCK] || VIDEO.EXAMPLES;
      _banner[_genre] = genreMovies[(Math.random() * genreMovies.length) | 0];
    });
    setBannerMovies(_banner);
  }, [success, setBannerMovies, externMovies, stockMovies]);

  useEffect(() => {
    dispatch(listProducts({ seller: VIDEO.SELLER, category: 'Video', pageSize: 11, order: 'oldest' }));

    (async function fetchData() {
      const _movieList = {};
      await Promise.all(
        Object.keys(VIDEO.SRC).map(async (genre) => {
          const { data } = await axios.get(VIDEO.URL + VIDEO.SRC[genre]).catch();
          _movieList[genre] = sourceAdapter(data.results);
        })
      );
      setExternMovies(_movieList);
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (products) setStockMovies({ [IN_STOCK]: products.filter((p) => p.seller._id === VIDEO.SELLER) });
  }, [products, setStockMovies]);

  return (
    <div className="container--full video-screen">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <SuspenseLoad children={<VideoNavHeader labels={VIDEO.GENRES} active={active} setActive={setActive} />} />

        <LoadingOrError xl statusOf={productCreate} />

        <SuspenseBanner children={<VideoBanner movie={bannerMovies[active]} youtubeTrailer />} />

        <SuspenseLoad>
          {!!externMovies &&
            (active === HOME ? (
              Object.keys(VIDEO.SRC).map((_genre) => (
                <VideoRow key={_genre} title={_genre} movies={externMovies} portrait={_genre === NETFLUX} />
              ))
            ) : (
              <VideoRow title={active} movies={externMovies} portrait={active === NETFLUX} />
            ))}
          <LoadingOrError xl statusOf={{ loading, error }} />

          <VideoRow title={IN_STOCK} movies={stockMovies} portrait={active !== NETFLUX} />
          <MessageBox msg={success && products.length < 1 && 'Sold Out/ No Product Found'} />

          {active !== TRENDING && <VideoRow title={TRENDING} movies={externMovies} />}
          {active !== TOP_RATED && <VideoRow title={TOP_RATED} movies={externMovies} />}
        </SuspenseLoad>
        <div className="banner__divider"></div>

        <SuspenseLoad children={<VideoBanner bottom movie={bannerMovies[active]} />} />
      </ErrorBoundary>
    </div>
  );
}
