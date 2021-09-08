import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import './videoScreen.css';
import { HOME, IN_STOCK, NETFLUX, STORE, TOP_RATED, TRENDING, VIDEO } from 'src/constants';
import { ErrorFallback, SuspenseBanner, SuspenseLoad, Suspense } from 'src/components/CustomSuspense';
import { useMovieList } from './useMovieList';
import LoadingOrError from 'src/components/LoadingOrError';
import MessageBox from 'src/components/MessageBox';
import VideoNavHeader from './VideoNavHeader';
import VideoBanner from './components/VideoBanner';
import VideoRow from './VideoRow';
import { dummyMovies } from 'src/utils';

export default function VideoScreen() {
  const [active, setActive] = useState(STORE);
  const { externMovies, bannerMovies, stockMovies, productCreate, productList } = useMovieList();

  return (
    <div className="container--full video-screen">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <SuspenseLoad children={<VideoNavHeader labels={VIDEO.GENRES} active={active} setActive={setActive} />} />
        <LoadingOrError xl statusOf={productCreate} />

        <SuspenseBanner children={<VideoBanner movie={bannerMovies[active]} youtubeTrailer />} />
        <Suspense fallback={VideoRowsFallBack}>
          {active === HOME &&
            Object.keys(VIDEO.SRC).map((genre) => (
              <VideoRow key={genre} genre={genre} movies={externMovies} portrait={genre === NETFLUX} />
            ))}
          {active !== HOME && <VideoRow genre={active} movies={externMovies} portrait={active === NETFLUX} />}
          <VideoRow label={IN_STOCK} genre={STORE} movies={stockMovies} portrait={active !== NETFLUX} />
          <LoadingOrError xl statusOf={productList} />
          <MessageBox msg={productList?.products?.length < 1 && 'Sold Out/ No Product Found'} />

          {active !== TRENDING && <VideoRow genre={TRENDING} movies={externMovies} />}
          {active !== TOP_RATED && <VideoRow genre={TOP_RATED} movies={externMovies} />}
        </Suspense>

        <div className="banner__divider" />
        <SuspenseLoad children={<VideoBanner bottom movie={bannerMovies[active]} />} />
      </ErrorBoundary>
    </div>
  );
}

const VideoRowsFallBack = (
  <>
    <VideoRow label={IN_STOCK} genre={STORE} movies={{ [STORE]: dummyMovies }} portrait />
    <VideoRow genre={TRENDING} movies={{ [TRENDING]: dummyMovies }} />
  </>
);
