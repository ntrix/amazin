import { memo } from 'react';

import './productScreen.css';
import { pipe } from 'src/utils';
import Rating from 'src/components/Rating';

function ProductDescription({ product: { name, rating, numReviews, deal, price, description } }) {
  return (
    <div className="col-1 mh-2">
      <ul>
        <li>
          <h1>{name}</h1>
        </li>

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
          Description:
          <p>{description}</p>
        </li>
      </ul>
    </div>
  );
}
export default memo(ProductDescription);
