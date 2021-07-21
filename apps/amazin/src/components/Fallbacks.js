import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

export const bannerFallback = (
  <div className="home-screen">
    <div className="home__banner bestseller banner"></div>
    <h2 className="home-screen__title">Top Sellers, Top Products</h2>
  </div>
);

export const videoFallback = <LoadingBox />;

export const ErrorFallback = ({ error }) => (
  <MessageBox variant="danger" msg={error.message} />
);
