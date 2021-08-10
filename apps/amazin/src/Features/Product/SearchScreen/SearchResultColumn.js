import React from 'react';
import { useSelector } from 'react-redux';

import LoadingOrError from '../../../components/LoadingOrError';
import MessageBox from '../../../components/MessageBox';
import ProductCard from '../../../components/ProductCard';

export function _SearchResultColumn() {
  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  return (
    <div className="row center search__results">
      {(!products || products.length < 2) && (
        <div className="placeholder"></div>
      )}

      <LoadingOrError xl wrapClass="placeholder" statusOf={productList} />
      {!productList.loading && (
        <>
          <MessageBox wrapClass="placeholder" show={!products.length}>
            No Product Found
          </MessageBox>

          {products?.map((product, id) => (
            <ProductCard key={id} product={product}></ProductCard>
          ))}
        </>
      )}

      {(!products || products.length < 3) && (
        <div className="placeholder"></div>
      )}

      <div className="row divider-inner"></div>
    </div>
  );
}

const SearchResultColumn = React.memo(_SearchResultColumn);
export default SearchResultColumn;
