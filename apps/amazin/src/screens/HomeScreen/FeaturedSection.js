import { lazy, memo } from 'react';
import { useSelector } from 'react-redux';

import { SuspenseLoad, SusProductCard } from 'src/components/CustomSuspense';
import LoadingOrError from 'src/components/LoadingOrError';
import MessageBox from 'src/components/MessageBox';
const ProductCard = lazy(() => import(/* webpackPrefetch: true */ '../Product/components/ProductCard'));

function FeaturedSection() {
  const { products, loading, error } = useSelector((state) => state.productList);

  return (
    <>
      <h2 className="screen__title">Featured Products</h2>
      <LoadingOrError xl statusOf={{ loading, error }} />
      <MessageBox hide={products?.length < 1}>No Product Found</MessageBox>

      <div className="screen__featured">
        <SuspenseLoad>
          {products?.map((product) => (
            <SusProductCard key={product._id} children={<ProductCard product={product} />} />
          ))}
        </SuspenseLoad>
      </div>
    </>
  );
}

export default memo(FeaturedSection);
