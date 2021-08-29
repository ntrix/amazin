import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

export const bannerFallback = (
  <div className="home__banner bestseller" style={{ position: 'relative', zIndex: 0, height: 448 }}>
    <br />
    <LoadingBox />
  </div>
);

export const loadingFallback = <LoadingBox />;

export const ErrorFallback = ({ error }) => <MessageBox variant="danger" msg={error.message} />;

export const delay = (time) => (promiseResult) =>
  new Promise((resolve) => setTimeout(() => resolve(promiseResult), time));
