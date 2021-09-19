import { memo, lazy } from 'react';

import { SusProductCard, SusProductList } from 'src/components/CustomSuspense';
import MessageBox from 'src/components/MessageBox';
import LoadingOrError from 'src/components/LoadingOrError';
const ProductCard: Lazy = lazy((): LazyPromise => import(/* webpackPrefetch: true */ './ProductCard'));

function ProductColumn({ productList: { products, loading, error } }: { productList: ProductListType }) {
  return (
    <>
      <LoadingOrError statusOf={{ loading, error }} />

      <MessageBox msg={products?.length < 1 && 'No Product Found'} />

      <SusProductList>
        {products?.map((product, id) => (
          <SusProductCard key={id} children={<ProductCard product={product} />} />
        ))}
      </SusProductList>
    </>
  );
}

export default memo(ProductColumn);
