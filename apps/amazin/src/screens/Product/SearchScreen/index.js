import { memo } from 'react';
import { useSelector } from 'react-redux';

import { NAV } from 'src/constants';
import { useSearchFilter } from './useSearchFilter';
import SearchFilterColumn from './SearchFilterColumn';
import SearchResultColumn from './SearchResultColumn';
import SubNavCategories from 'src/components/Nav/SubNavCategories';
import SearchBanner from 'src/components/Nav/SearchBanner';
import SortFilter from 'src/components/SortFilter';
import Pagination from 'src/components/Pagination';

/* this is New Releases Screen (at first) */

function SearchScreen() {
  const { order, category, max, rating, getFilterUrl } = useSearchFilter();
  const productList = useSelector((state) => state.productList);
  const { page, pages } = productList;

  return (
    <div className="search-screen">
      <SubNavCategories first={NAV.ALL} category={category} getUrl={getFilterUrl} />

      <SearchBanner list={productList}>
        <SortFilter order={order} getUrl={getFilterUrl} />
      </SearchBanner>

      <div className="row top search-screen__result">
        <SearchFilterColumn searchFilters={{ category, max, rating }} getFilterUrl={getFilterUrl} />
        <div className="col-9">
          <SearchResultColumn list={productList} />
          <Pagination getUrl={getFilterUrl} page={page} pages={pages} help />
        </div>
      </div>
    </div>
  );
}

export default memo(SearchScreen);
