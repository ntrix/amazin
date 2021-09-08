import { memo } from 'react';
import { useSelector } from 'react-redux';
import { SuspenseLoad } from 'src/components/CustomSuspense';
import LoadingOrError from 'src/components/LoadingOrError';
import MessageBox from 'src/components/MessageBox';
import { SusProductCard } from '../Product/components/ProductCard';

function FeaturedSection() {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  return (
    <>
      <h2 className="screen__title">Featured Products</h2>
      <LoadingOrError xl statusOf={{ loading, error }} />
      <MessageBox hide={products?.length < 1}>No Product Found</MessageBox>

      <div className="screen__featured">
        <SuspenseLoad>
          {products?.map((product) => (
            <SusProductCard key={product._id} product={product} />
          ))}
        </SuspenseLoad>
      </div>
    </>
  );
}

export default memo(FeaturedSection);
