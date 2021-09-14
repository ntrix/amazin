import { memo } from 'react';
import { useSelector } from 'react-redux';

import { createListItem } from './listItemCreator';
import { NAV, prices, ratings } from 'src/constants';
import Rating from 'src/components/Rating';
import LoadingOrError from 'src/components/LoadingOrError';

const FilterLabel = ({ label, children }: { label?: string; children?: Children }) => (
  <li>
    <h4 className="mt-2">{label || children}</h4>
  </li>
);

type PropType = {
  searchFilters: FilterOptType;
  getFilterUrl: FnType;
};

function SearchFilterColumn({ searchFilters: { category = NAV.ALL, max = 0, rating = 0 }, getFilterUrl }: PropType) {
  const productCategoryList: ProductCategoriesType = useSelector((state: AppState) => state.productCategoryList);
  const ListItem = memo(createListItem(getFilterUrl));

  return (
    <div className="search__filter">
      <ul>
        <FilterLabel label="Department" />
        <LoadingOrError statusOf={productCategoryList} />
        <ListItem filter={{ category: NAV.ALL }} isActive={NAV.ALL === category} text="Any" />
        {productCategoryList.categories?.map((_cat, id) => (
          <ListItem key={id} filter={{ category: _cat }} isActive={_cat === category} text={_cat} />
        ))}

        <FilterLabel label="Price" />
        {prices.map((p, id) => (
          <ListItem key={id} filter={{ min: p.min, max: p.max }} isActive={`${p.max}` === `${max}`} text={p.name} />
        ))}

        <FilterLabel label="Avg. Customer Review" />
        {ratings.map((r, id) => (
          <ListItem key={id} filter={{ rating: r.rating }} isActive={`${r.rating}` === `${rating}`}>
            <Rating caption={' & up'} rating={r.rating}></Rating>
          </ListItem>
        ))}
      </ul>
    </div>
  );
}

export default memo(SearchFilterColumn);
