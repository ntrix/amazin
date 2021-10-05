import { memo } from 'react';

import { createListItem } from 'src/components/Product/SearchScreen/ListItem';
import { FilterOptType, NAV, prices, ratings } from 'src/constants';
import Rating from 'src/components/Rating';
import LoadingOrError from 'src/components/LoadingOrError';

type FilterLabelProps = {
  label?: string;
  children?: Children;
};

const FilterLabel = ({ label, children }: FilterLabelProps) => (
  <li>
    <h4 className="mt-2">{label || children}</h4>
  </li>
);

export type FilterProps = {
  searchFilters: FilterOptType;
  getFilterUrl: FnType;
  categoryList: ProductCategoriesType;
};

function SearchFilterColumn({ searchFilters, getFilterUrl, categoryList }: FilterProps) {
  const { category = NAV.ALL, max = 0, rating = 0 } = searchFilters;
  const ListItem = memo(createListItem(getFilterUrl));

  return (
    <div className="search__filter">
      <ul>
        <FilterLabel label="Department" />
        <ListItem filter={{ category: NAV.ALL }} isActive={NAV.ALL === category} text="Any" />
        {categoryList.categories?.map((_cat) => (
          <ListItem key={_cat} filter={{ category: _cat }} isActive={_cat === category} text={_cat} />
        ))}
        <LoadingOrError statusOf={categoryList} />

        <FilterLabel label="Price" />
        {prices.map((p) => (
          <ListItem key={p.name} filter={{ min: p.min, max: p.max }} isActive={`${p.max}` === `${max}`} text={p.name} />
        ))}

        <FilterLabel label="Avg. Customer Review" />
        {ratings.map((r) => (
          <ListItem key={r.rating} filter={{ rating: r.rating }} isActive={`${r.rating}` === `${rating}`}>
            <Rating caption={' & up'} rating={r.rating} />
          </ListItem>
        ))}
      </ul>
    </div>
  );
}

export default memo(SearchFilterColumn);
