import { lazy, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import './videoScreen.css';
import { HOME, IN_STOCK, NETFLUX, STORE, TOP_RATED, TRENDING, VIDEO } from 'src/constants';
import { SuspenseBanner, SuspenseLoad, Suspense } from 'src/components/CustomSuspense';
import { ErrorFallback, VideoListFallBack } from 'src/components/Fallbacks';
import { useMovieList } from './useMovieList';
import LoadingOrError from 'src/components/LoadingOrError';
import MessageBox from 'src/components/MessageBox';
import VideoNavHeader from './VideoNavHeader';
import VideoBanner from './components/VideoBanner';
const VideoRow: Lazy = lazy((): LazyPromise => import(/* webpackPrefetch: true */ './VideoRow'));

export default function VideoScreen() {
  const [active, setActive] = useState<GenreType>(STORE);
  const { externMovies, bannerMovies, stockMovies, productCreate, productList } = useMovieList();

  return (
    <div className="container--full video-screen">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <SuspenseLoad children={<VideoNavHeader genreLabels={VIDEO.GENRES} active={active} setActive={setActive} />} />
        <LoadingOrError xl statusOf={productCreate} />

        <SuspenseBanner children={<VideoBanner movie={bannerMovies[active]} youtubeTrailer />} />

        <Suspense fallback={VideoListFallBack}>
          {active === HOME &&
            Object.keys(VIDEO.SRC).map((genre) => (
              <VideoRow key={genre} genre={genre} movies={externMovies} portrait={genre === NETFLUX} />
            ))}
          {![HOME, STORE].includes(active) && <VideoRow genre={active} movies={externMovies} />}
          <VideoRow label={IN_STOCK} genre={STORE} movies={stockMovies} portrait />
          <LoadingOrError xl statusOf={productList} />
          <MessageBox msg={productList?.products?.length < 1 && 'Sold Out/ No Product Found'} />

          {!TRENDING.includes(active) && <VideoRow genre={TRENDING} movies={externMovies} />}
          {!TOP_RATED.includes(active) && <VideoRow genre={TOP_RATED} movies={externMovies} />}
        </Suspense>

        <div className="banner__divider" />
        <SuspenseLoad children={<VideoBanner bottom movie={bannerMovies[active]} />} />
      </ErrorBoundary>
    </div>
  );
}
