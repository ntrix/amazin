import { memo } from 'react';
import { useSelector } from 'react-redux';

import { SusProductCard, SusProductList } from 'src/components/CustomSuspense';
import ProductCard from '../components/ProductCard';
import MessageBox from 'src/components/MessageBox';
import LoadingOrError from 'src/components/LoadingOrError';

function SearchResultColumn() {
  const productList = useSelector((state) => state.productList);
  const { products, loading } = productList;

  return (
    <div className="row center search__results">
      <LoadingOrError wrapClass="placeholder" statusOf={productList} />

      <MessageBox wrapClass="placeholder" msg={!loading && products?.length < 1 && 'No Product Found'} />

      <div className="row center">
        <SusProductList>
          {products?.map((product, id) => (
            <SusProductCard key={id} children={<ProductCard product={product} />} />
          ))}
        </SusProductList>
      </div>

      <div className="row divider-inner" />
    </div>
  );
}

export default memo(SearchResultColumn);
