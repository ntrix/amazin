import React from 'react';

import './productScreen.css';
import Rating from '../../../components/Rating';
import { pipe } from '../../../utils';

export function _ProductDescription({ product }) {
  return (
    <div className="col-1 mh-2">
      <ul>
        <li>
          <h1>{product.name}</h1>
        </li>

        <li>
          <Rating rating={product.rating} numReviews={product.numReviews} />
        </li>

        <li>
          <div>
            <span className={`price ${product.deal ? 'danger' : ''}`}>
              <sup>{pipe.getSymbol()}</sup>
              {pipe.getNote(product.price)}
              <sup>{pipe.getCent(product.price)}</sup>
            </span>

            {product.deal > 0 && (
              <span className="pull-right">
                <b className="price strike">
                  <sup>{pipe.getSymbol()}</sup>
                  {pipe.getPrice(product.price / (1 - product.deal / 100))}
                </b>
                {'  (' + product.deal}% off)
              </span>
            )}
          </div>
        </li>

        <li>
          Description:
          <p>{product.description}</p>
        </li>
      </ul>
    </div>
  );
}

const ProductDescription = React.memo(_ProductDescription);
export default ProductDescription;
