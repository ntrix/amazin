import { memo, useState } from 'react';

import PriceNow from '../components/PriceNow';
import CustomSelect from 'src/components/CustomSelect';
import Button from 'src/components/Button';
import RowLegend from 'src/components/RowLegend';

function ProductInStock({ productId, product: { price, countInStock } }) {
  const [qty, setQty] = useState(1);

  return (
    <div className="card card__body m-0">
      <RowLegend label="Price" className="mt-1" children={<PriceNow price={price} />} />

      <RowLegend label="Status">
        {countInStock > 0 ? <span className="success">In Stock</span> : <span className="danger">Unavailable</span>}
      </RowLegend>

      {countInStock > 0 && (
        <>
          <RowLegend label="Quantity">
            <CustomSelect max={countInStock} value={qty} onChange={setQty} />
          </RowLegend>

          <Button primary fill to={`/cart/${productId}?qty=${qty}`} label="Add to Cart" />
        </>
      )}
    </div>
  );
}

export default memo(ProductInStock);
