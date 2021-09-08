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
          {active === HOME ? (
            Object.keys(VIDEO.SRC).map((_genre) => (
              <VideoRow key={_genre} title={_genre} movies={externMovies} portrait={_genre === NETFLUX} />
            ))
          ) : (
            <VideoRow title={active} movies={externMovies} portrait={active === NETFLUX} />
          )}
          <LoadingOrError xl statusOf={productList} />
          <VideoRow title={IN_STOCK} movies={stockMovies} portrait={active !== NETFLUX} />
          <MessageBox msg={productList?.products?.length < 1 && 'Sold Out/ No Product Found'} />

          {active !== TRENDING && <VideoRow title={TRENDING} movies={externMovies} />}
          {active !== TOP_RATED && <VideoRow title={TOP_RATED} movies={externMovies} />}
        </Suspense>

        <div className="banner__divider" />
        <SuspenseLoad children={<VideoBanner bottom movie={bannerMovies[active]} />} />
      </ErrorBoundary>
    </div>
  );
}

const VideoRowsFallBack = (
  <>
    <VideoRow title={IN_STOCK} movies={{ [IN_STOCK]: dummyMovies }} portrait />
    <VideoRow title={TRENDING} movies={{ [TRENDING]: dummyMovies }} />
  </>
);
