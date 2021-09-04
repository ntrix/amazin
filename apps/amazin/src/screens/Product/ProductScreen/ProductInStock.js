import { memo, useState } from 'react';
import Button from 'src/components/Button';
import QtySelect from 'src/components/QtySelect';

import PriceNow from '../components/PriceNow';

function ProductInStock({ productId, product: { price, countInStock } }) {
  const [qty, setQty] = useState(1);

  return (
    <div className="card card__body m-0">
      <div className="row mt-1">
        <p>Price</p>
        <PriceNow price={price} />
      </div>

      <div className="row">
        <p>Status</p>
        <div>
          {countInStock > 0 ? <span className="success">In Stock</span> : <span className="danger">Unavailable</span>}
        </div>
      </div>

      {countInStock > 0 && (
        <>
          <div className="row">
            <p>Quantity</p>
            <QtySelect max={countInStock} value={qty} onChange={setQty} />
          </div>

          <Button primary fill to={`/cart/${productId}?qty=${qty}`} label="Add to Cart" />
        </>
      )}
    </div>
  );
}

export default memo(ProductInStock);
