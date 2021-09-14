import { memo } from 'react';

function SearchBanner({ list, children }: { list?: ProductListType; children?: Children }) {
  const { products = null, page = 1, count = 0 } = list ?? {};
  const size = products?.length || 0;
  const fromItem = size * (page - 1);
  const toItem = Math.min(fromItem + size, count);

  return (
    <div className="row search__banner">
      <div className="search__counter">
        {fromItem + (toItem ? 1 : 0)} - {toItem} of {count} Results
      </div>
      {children}
    </div>
  );
}

export default memo(SearchBanner);
