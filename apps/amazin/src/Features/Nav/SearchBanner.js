import React from 'react';
import { useSelector } from 'react-redux';

export function _SearchBanner({ children }) {
  const productList = useSelector((state) => state.productList);
  const { products, count } = productList;

  return (
    <div className="row search__banner">
      <div className="search__counter">
        {products?.length || 0} of {count || 0} Results
      </div>
      {children}
    </div>
  );
}

const SearchBanner = React.memo(_SearchBanner);
export default SearchBanner;
