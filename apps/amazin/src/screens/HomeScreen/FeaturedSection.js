import { memo } from 'react';
import ProductCard, { SusProductList } from '../Product/components/ProductCard';
import LoadingOrError from 'src/components/LoadingOrError';
import MessageBox from 'src/components/MessageBox';

function FeaturedSection({ productList: { products, loading, error } }) {
  return (
    <>
      <h2 className="screen__title">Featured Products</h2>
      <LoadingOrError xl statusOf={{ loading, error }} />
      <MessageBox hide={products?.length < 1}>No Product Found</MessageBox>

      <div className="screen__featured">
        <SusProductList>
          {products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SusProductList>
      </div>
    </>
  );
}

export default memo(FeaturedSection);
