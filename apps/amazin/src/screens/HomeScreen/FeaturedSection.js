import { memo } from 'react';
import { useSelector } from 'react-redux';
import LoadingOrError from 'src/components/LoadingOrError';
import MessageBox from 'src/components/MessageBox';
import ProductCard, { SusProductList } from '../Product/components/ProductCard';

function FeaturedSection() {
  const { products, loading, error } = useSelector((state) => state.productList);

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
