import { memo } from 'react';

import './productScreen.css';
import { pipe } from 'src/utils';
import Rating from 'src/components/Rating';
import Header from 'src/layouts/Header';

function ProductDescription({ product: { name, rating, numReviews, deal, price, description } }) {
  return (
    <div className="col-1 mh-2">
      <Header label={name} />
      <ul>
        <li>
          <Rating rating={rating} numReviews={numReviews} />
        </li>

        <li>
          <div>
            <span className={`price ${deal ? 'danger' : ''}`}>
              <sup>{pipe.getSymbol()}</sup>
              {pipe.getNote(price)}
              <sup>{pipe.getCent(price)}</sup>
            </span>
            {deal > 0 && (
              <span className="pull-right">
                <b className="price strike">
                  <sup>{pipe.getSymbol()}</sup>
                  {pipe.getPrice(price / (1 - deal / 100))}
                </b>
                {`  (${deal}% off)`}
              </span>
            )}
          </div>
        </li>

        <li>
          <b>Description:</b>
          <p>{description}</p>
        </li>
      </ul>
    </div>
  );
}
export default memo(ProductDescription);
