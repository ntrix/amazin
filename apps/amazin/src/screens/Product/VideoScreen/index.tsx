import { lazy, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import './videoScreen.css';
import { GenreType, HOME, IN_STOCK, NETFLUX, STORE, TOP_RATED, TRENDING, VIDEO } from 'src/constants';
import { SuspenseBanner, SuspenseLoad, Suspense } from 'src/components/CustomSuspense';
import { ErrorFallback, VideoListFallBack } from 'src/components/Fallbacks';
import { useBannerMovies, useStockMovies } from 'src/screens/Product/VideoScreen/useMovieList';
import LoadingOrError from 'src/components/LoadingOrError';
import MessageBox from 'src/components/MessageBox';
import VideoNavHeader from 'src/components/Product/VideoScreen/VideoNavHeader';
import VideoBanner from 'src/components/Product/VideoScreen/components/VideoBanner';
const VideoRow: Lazy = lazy(
  (): LazyPromise => import(/* webpackPrefetch: true */ 'src/components/Product/VideoScreen/VideoRow')
);

export default function VideoScreen() {
  const [active, setActive] = useState<GenreType>(STORE);
  const { productList, productCreate, stockMovies } = useStockMovies();
  const { externMovies, bannerMovies } = useBannerMovies(stockMovies);

  return (
    <div className="container--full video-screen">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <SuspenseLoad children={<VideoNavHeader genreLabels={VIDEO.GENRES} active={active} setActive={setActive} />} />

        <SuspenseBanner children={<VideoBanner movie={bannerMovies[active]} youtubeTrailer />} />

        <Suspense fallback={VideoListFallBack}>
          {active === HOME &&
            Object.keys(VIDEO.SRC).map((genre) => (
              <VideoRow key={genre} genre={genre} movies={externMovies} portrait={genre === NETFLUX} />
            ))}
          {![HOME, STORE].includes(active) && <VideoRow genre={active} movies={externMovies} />}
          <VideoRow label={IN_STOCK} genre={STORE} movies={stockMovies} portrait />
          <LoadingOrError xl statusOf={productCreate || productList} />
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
