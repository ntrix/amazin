import { Suspense } from 'react';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

export const bannerFallback = (
  <div className="home__banner bestseller" style={{ position: 'relative', zIndex: 0, height: 448 }}>
    <br />
    <LoadingBox />
  </div>
);

export const loadingFallback = <LoadingBox />;

export const delay = (time) => (promiseResult) =>
  new Promise((resolve) => setTimeout(() => resolve(promiseResult), time));

export function ErrorFallback({ error }) {
  return <MessageBox variant="danger" msg={error.message} />;
}

export function SuspenseLoad(props) {
  return <Suspense fallback={loadingFallback} {...props} />;
}

export function SuspenseBanner(props) {
  return <Suspense fallback={bannerFallback} {...props} />;
}
