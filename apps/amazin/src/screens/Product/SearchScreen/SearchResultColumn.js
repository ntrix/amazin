import { memo } from 'react';
import { useSelector } from 'react-redux';

import { SusProductCard, SusProductList } from '../components/ProductCard';
import MessageBox from 'src/components/MessageBox';
import LoadingOrError from 'src/components/LoadingOrError';

function SearchResultColumn() {
  const productList = useSelector((state) => state.productList);
  const { products, loading } = productList;

  return (
    <div className="row center search__results">
      {(!products || products.length < 2) && <div className="placeholder"></div>}
      <LoadingOrError xl wrapClass="placeholder" statusOf={productList} />

      <MessageBox wrapClass="placeholder" msg={!loading && products?.length < 1 && 'No Product Found'} />

      <SusProductList>
        {products?.map((product, id) => (
          <SusProductCard key={id} product={product} />
        ))}
      </SusProductList>

      {(!products || products.length < 3) && <div className="placeholder"></div>}
      <div className="row divider-inner"></div>
    </div>
  );
}

export default memo(SearchResultColumn);
