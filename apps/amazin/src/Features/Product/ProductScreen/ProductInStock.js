import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { pipe } from '../../../utils';

export function _ProductScreen({ productId, product }) {
  const history = useHistory();
  const [qty, setQty] = useState(1);

  const addToCartHandler = () => {
    history.push(`/cart/${productId}?qty=${qty}`);
  };

  return (
    <ul className="card card__body m-0">
      <li>
        <div className="row">
          <div>Price</div>

          <div className="price">
            <sup>{pipe.getSymbol()}</sup>
            {pipe.getNote(product.price)}
            <sup>{pipe.getCent(product.price)}</sup>
          </div>
        </div>
      </li>

      <li>
        <div className="row">
          <div>Status</div>

          <div>
            {product.countInStock > 0 ? (
              <span className="success">In Stock</span>
            ) : (
              <span className="danger">Unavailable</span>
            )}
          </div>
        </div>
      </li>

      {product.countInStock > 0 && (
        <>
          <li>
            <div className="row">
              <div>Quantity</div>

              <div className="select-wrapper">
                <div className="sprite__caret xl"></div>

                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </li>

          <li>
            <button onClick={addToCartHandler} className="primary block">
              Add to Cart
            </button>
          </li>
        </>
      )}
    </ul>
  );
}

const ProductScreen = React.memo(_ProductScreen);
export default ProductScreen;
