import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { listProducts } from '../../../Controllers/productActions';
import SearchFilterColumn from './SearchFilterColumn';
import SearchResultColumn from './SearchResultColumn';
import SubNavCategories from '../../Nav/SubNavCategories';

import SortFilter from '../../../components/SortFilter';
import Pagination from '../../../components/Pagination';
import { NAV, SORT } from '../../../constants';
import SearchBanner from '../../Nav/SearchBanner';

export function _SearchScreen() {
  const dispatch = useDispatch();
  const {
    name = NAV.ALL,
    category = NAV.ALL,
    min = 0.01,
    max = 0,
    rating = 0,
    order = SORT.BESTSELLING.OPT,
    pageNumber = 1
  } = useParams();

  useEffect(() => {
    dispatch(
      listProducts({
        pageNumber,
        min,
        max,
        rating,
        order,
        category,
        name
      })
    );
  }, [category, dispatch, max, min, name, order, rating, pageNumber]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const filterRating = (filter.rating + 1 || rating + 1) - 1;
    const sortOrder = filter.order || order;
    const filterMin = filter.min || (filter.min === 0 ? 0.01 : min);
    const filterMax = filter.max || (filter.max === 0 ? 0 : max);
    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`;
  };

  return (
    <div className="search-screen">
      <SubNavCategories first={NAV.ALL} hook={{ category, getFilterUrl }} />

      <SearchBanner>
        <SortFilter order={order} getUrl={getFilterUrl} />
      </SearchBanner>

      <div className="row top search-screen__result">
        <SearchFilterColumn
          searchFilters={{ category, max, rating }}
          getFilterUrl={getFilterUrl}
        />

        <div className="col-9">
          <SearchResultColumn />
          <Pagination getUrl={getFilterUrl} help />
        </div>
      </div>
    </div>
  );
}

const SearchScreen = React.memo(_SearchScreen);
export default SearchScreen;
