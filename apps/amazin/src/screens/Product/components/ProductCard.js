import { memo } from 'react';
import { Link } from 'react-router-dom';

import { LazyImg } from 'src/apis/suspenseAPI';
import { getImgUrl, pipe, savePath } from 'src/utils';
import { DUMMYSELLERS, NO_IMAGE_P } from 'src/constants';
import Rating from 'src/components/Rating';
import PriceTag from './PriceTag';

function ProductCard({
  hasDeal = false,
  product: { _id, name, image, rating, numReviews, price, deal, category, ship, seller }
}) {
  const imgs = image.split('^');
  const imgUrl = getImgUrl(_id, imgs[!!hasDeal] || imgs[0] || NO_IMAGE_P);

  return (
    <div className="card flex">
      <div className="card__center">
        <Link to={`/product/${_id}`} onClick={savePath()}>
          <LazyImg className="thumbnail" src={imgUrl} alt={name} />
        </Link>

        <div className="card__body">
          <Link to={`/product/${_id}`} onClick={savePath()}>
            <h2>{name}</h2>
          </Link>

          <Rating rating={rating} numReviews={numReviews}></Rating>

          <div>
            <PriceTag price={price} deal={hasDeal} />

            {hasDeal ? (
              <div>
                <Link to={`/search/category/:${category}`} className="row">
                  Category: {category}
                </Link>
              </div>
            ) : (
              <>
                <sub>Shipping: {pipe.showPrice(ship)} excl.</sub>
                <div>
                  <Link to={`/seller/${seller._id}`} className="row end text-right">
                    Seller & Store
                    <br />
                    {seller?.seller?.name || DUMMYSELLERS.name}
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCard);
