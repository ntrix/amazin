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

export function SuspenseSeller(props) {
  return <Suspense fallback={<h4>Seller</h4>} {...props} />;
}

export function SuspenseText(props) {
  return <Suspense fallback={<h3>Amazin' Amazim. Loading...</h3>} {...props} />;
}

export function SuspenseNull(props) {
  return <Suspense fallback={null} {...props} />;
}

export { Suspense };
