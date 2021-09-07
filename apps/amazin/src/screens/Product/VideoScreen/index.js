import { lazy, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import './videoScreen.css';
import { HOME, IN_STOCK, NETFLUX, STORE, TOP_RATED, TRENDING, VIDEO } from 'src/constants';
import { delay, ErrorFallback, SuspenseBanner, SuspenseLoad } from 'src/components/CustomSuspense';
import { useMovieList } from './useMovieList';
import LoadingOrError from 'src/components/LoadingOrError';
import MessageBox from 'src/components/MessageBox';

const VideoNavHeader = lazy(() => import(/* webpackPrefetch: true */ './VideoNavHeader'));
const VideoBanner = lazy(() => import(/* webpackPrefetch: true */ './components/VideoBanner'));
const VideoRow = lazy(() => import(/* webpackPrefetch: true */ './VideoRow').then(delay(3000)));

export default function VideoScreen() {
  const [active, setActive] = useState(STORE);
  const { externMovies, bannerMovies, stockMovies, productCreate, stockList } = useMovieList();
  const { products, success } = stockList;

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
          <LoadingOrError xl statusOf={stockList} />
          <VideoRow title={IN_STOCK} movies={stockMovies} portrait={active !== NETFLUX} />
          <MessageBox msg={success && products.length < 1 && 'Sold Out/ No Product Found'} />

          {active !== TRENDING && <VideoRow title={TRENDING} movies={externMovies} />}
          {active !== TOP_RATED && <VideoRow title={TOP_RATED} movies={externMovies} />}
        </SuspenseLoad>
        <div className="banner__divider" />

        <SuspenseLoad children={<VideoBanner bottom movie={bannerMovies[active]} />} />
      </ErrorBoundary>
    </div>
  );
}
