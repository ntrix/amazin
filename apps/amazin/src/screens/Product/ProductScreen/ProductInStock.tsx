import { memo, useState } from 'react';

import { DescriptionProps } from './ProductDescription';
import { ProductReviewProps } from './ProductReview';
import PriceNow from 'src/components/Product/PriceNow';
import CustomSelect from 'src/components/CustomSelect';
import Button from 'src/components/Button';
import RowLegend from 'src/components/RowLegend';

export type ProductInStockProps = DescriptionProps & ProductReviewProps;

function ProductInStock({ productId, product: { price, countInStock } }: ProductInStockProps) {
  const [qty, setQty] = useState(1);

  return (
    <div className="card card__body m-0">
      <RowLegend label="Price" className="mt-1" children={<PriceNow price={price} />} />

      <RowLegend label="Status">
        {countInStock ? <span className="success">In Stock</span> : <span className="danger">Unavailable</span>}
      </RowLegend>

      {!!countInStock && (
        <>
          <RowLegend label="Quantity">
            <CustomSelect max={countInStock} value={qty} onChange={(e: EventType) => setQty(e.target.value)} />
          </RowLegend>

          <Button primary fill to={`/cart/${productId}?qty=${qty}`} label="Add to Cart" />
        </>
      )}
    </div>
  );
}

export default memo(ProductInStock);
