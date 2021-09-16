import { NO_IMAGE, NO_IMAGE_P, IN_STOCK, TRENDING } from 'src/constants';
import { dummyProducts } from 'src/utils';
import MessageBox from './MessageBox';

export const bannerFallback = (
  <div className="home__banner bestseller" style={{ position: 'relative', zIndex: 0, height: 448 }} />
);

export const ErrorFallback = ({ error }: { error: { message: string } }) => (
  <MessageBox variant="danger" msg={error.message} />
);

export const ImgFallback = ({ portrait }: { portrait?: boolean }) => (
  <img src={portrait ? NO_IMAGE_P : NO_IMAGE} alt="loading .." />
);

export const VideoCardFallBack = ({ portrait }: { portrait?: boolean }) => (
  <div className={`fallback m-card ${portrait ? 'm-card--portrait pr-3' : ''}`}>
    <ImgFallback portrait={portrait} />
    <div className="m-card__info">
      <div className="m-card__name">
        loading ..
        <div className="sprite__loading" />
      </div>
    </div>
  </div>
);

const dummyList = Array(6).fill(0);

export const VideoRowFallBack = ({ label, portrait }: { label?: string; portrait?: boolean }) => (
  <div className="m-row">
    <h2>{label}</h2>
    <div className="react-multi-carousel-list">
      <ul className="react-multi-carousel-track">
        {dummyList.map((_, id) => (
          <VideoCardFallBack key={id} portrait={portrait} />
        ))}
      </ul>
    </div>
  </div>
);

export const VideoListFallBack = (
  <>
    <div className="sprite__loading" />
    <VideoRowFallBack label={IN_STOCK} portrait />
    <VideoRowFallBack label={TRENDING} />
  </>
);

export const ProductCardFallback = () => (
  <div className="card flex">
    <div className="card__center">
      <img className="thumbnail" src={NO_IMAGE_P} alt="dummy" />
      <div className="card__body">
        <h2>Loading ...</h2>
        <div className="sprite__loading" />
      </div>
    </div>
  </div>
);

export const productListFallback = dummyProducts.map((_, id) => <ProductCardFallback key={id} />);
