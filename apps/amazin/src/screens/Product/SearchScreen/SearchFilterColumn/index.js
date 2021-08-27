import React from 'react';
import { useSelector } from 'react-redux';

import FilterListItem from './FilterListItem';

import LoadingOrError from '../../../../components/LoadingOrError';
import Rating from '../../../../components/Rating';
import { NAV, prices, ratings } from '../../../../constants';

export function _SearchFilterColumn({
  searchFilters: { category, max, rating },
  getFilterUrl
}) {
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const { categories } = productCategoryList;

  const ListItem = React.memo(FilterListItem(getFilterUrl));

  return (
    <div className="search__filter">
      <ul>
        <h4>Department</h4>

        <div>
          <LoadingOrError statusOf={productCategoryList} />

          <ListItem
            filter={{ category: NAV.ALL }}
            active={NAV.ALL === category}
            text="Any"
          />

          {categories?.map((_cat, id) => (
            <ListItem
              key={id}
              filter={{ category: _cat }}
              active={_cat === category}
              text={_cat}
            />
          ))}
        </div>

        <br />
        <h4>Price</h4>

        <div>
          {prices.map((p, id) => (
            <ListItem
              key={id}
              filter={{ min: p.min, max: p.max }}
              active={`${p.max}` === `${max}`}
              text={p.name}
            />
          ))}
        </div>

        <br />
        <h4>Avg. Customer Review</h4>

        <div>
          {ratings.map((r, id) => (
            <ListItem
              key={id}
              filter={{ rating: r.rating }}
              active={`${r.rating}` === `${rating}`}
            >
              <Rating caption={' & up'} rating={r.rating}></Rating>
            </ListItem>
          ))}
        </div>
      </ul>
    </div>
  );
}

const SearchFilterColumn = React.memo(_SearchFilterColumn);
export default SearchFilterColumn;
