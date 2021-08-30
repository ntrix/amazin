import { memo } from 'react';
import { useSelector } from 'react-redux';

function SearchBanner({ info, children }) {
  const productList = useSelector((state) => state.productList);
  const { products, page, count } = info || productList;
  const size = products?.length || 0;
  const fromItem = size * (page - 1);
  const toItem = Math.min(fromItem + size, count);

  return (
    <div className="row search__banner">
      <div className="search__counter">
        {fromItem + (toItem ? 1 : 0) || 0} - {toItem || 0} of {count || 0} Results
      </div>
      {children}
    </div>
  );
}
export default memo(SearchBanner);
