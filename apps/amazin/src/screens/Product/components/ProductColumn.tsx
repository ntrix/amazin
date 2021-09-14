import { memo, lazy } from 'react';

import { SusProductCard, SusProductList } from 'src/components/CustomSuspense';
import MessageBox from 'src/components/MessageBox';
import LoadingOrError from 'src/components/LoadingOrError';
const ProductCard = lazy(() => import(/* webpackPrefetch: true */ './ProductCard'));

function ProductColumn({ productList: { products, loading, error } }) {
  return (
    <>
      <LoadingOrError statusOf={{ loading, error }} />

      <MessageBox msg={products?.length < 1 && 'No Product Found'} />

      <div className="row center">
        <SusProductList>
          {products?.map((product: ProductType, id: number) => (
            <SusProductCard key={id} children={<ProductCard product={product} />} />
          ))}
        </SusProductList>
      </div>
    </>
  );
}

export default memo(ProductColumn);
