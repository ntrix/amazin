import { memo } from 'react';

import { createListItem } from './listItemCreator';
import { NAV, prices, ratings } from 'src/constants';
import Rating from 'src/components/Rating';
import LoadingOrError from 'src/components/LoadingOrError';

const FilterLabel = ({ label, children }) => (
  <li>
    <h4 className="mt-2">{label || children}</h4>
  </li>
);

function SearchFilterColumn({ categoryList, searchFilters: { category, max, rating }, getFilterUrl }) {
  const ListItem = memo(createListItem(getFilterUrl));

  return (
    <div className="search__filter">
      <ul>
        <FilterLabel label="Department" />
        <LoadingOrError statusOf={categoryList} />
        <ListItem filter={{ category: NAV.ALL }} active={NAV.ALL === category} text="Any" />
        {categoryList.categories?.map((_cat, id) => (
          <ListItem key={id} filter={{ category: _cat }} active={_cat === category} text={_cat} />
        ))}

        <FilterLabel label="Price" />
        {prices.map((p, id) => (
          <ListItem key={id} filter={{ min: p.min, max: p.max }} active={`${p.max}` === `${max}`} text={p.name} />
        ))}

        <FilterLabel label="Avg. Customer Review" />
        {ratings.map((r, id) => (
          <ListItem key={id} filter={{ rating: r.rating }} active={`${r.rating}` === `${rating}`}>
            <Rating caption={' & up'} rating={r.rating}></Rating>
          </ListItem>
        ))}
      </ul>
    </div>
  );
}

export default memo(SearchFilterColumn);
