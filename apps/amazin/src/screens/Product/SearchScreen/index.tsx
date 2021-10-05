import { memo } from 'react';
import { useSelector } from 'react-redux';

import { NAV } from 'src/constants';
import { useSearchFilter } from './useSearchFilter';
import SearchFilterColumn from './SearchFilterColumn';
import SubNavCategories from 'src/components/Nav/SubNavCategories';
import SearchBanner from 'src/components/Nav/SearchBanner';
import SortFilter from 'src/components/SortFilter';
import Pagination from 'src/components/Pagination';
import ProductColumn from 'src/components/Product/ProductColumn';

/* this is New Releases Screen at first */

function SearchScreen() {
  const { order, category, max, rating, getFilterUrl } = useSearchFilter();
  const productList: ProductListType = useSelector((state: AppState) => state.productList);
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
          <div className="row center search__results">
            <ProductColumn productList={productList} />

            <div className="row divider-inner" />
          </div>
          <Pagination getUrl={getFilterUrl} page={page} pages={pages} help />
        </div>
      </div>
    </div>
  );
}

export default memo(SearchScreen);
