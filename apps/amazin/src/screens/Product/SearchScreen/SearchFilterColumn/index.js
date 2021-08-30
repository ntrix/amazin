import { memo } from 'react';
import { useSelector } from 'react-redux';
import { createListItem } from './listItemCreator';
import { NAV, prices, ratings } from 'src/constants';
import Rating from 'src/components/Rating';
import LoadingOrError from 'src/components/LoadingOrError';

function SearchFilterColumn({ searchFilters: { category, max, rating }, getFilterUrl }) {
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const { categories } = productCategoryList;
  const ListItem = memo(createListItem(getFilterUrl));
  return (
    <div className="search__filter">
      <ul>
        <h4>Department</h4>
        <div>
          <LoadingOrError statusOf={productCategoryList} />
          <ListItem filter={{ category: NAV.ALL }} active={NAV.ALL === category} text="Any" />
          {categories?.map((_cat, id) => (
            <ListItem key={id} filter={{ category: _cat }} active={_cat === category} text={_cat} />
          ))}
        </div>
        <br />
        <h4>Price</h4>
        <div>
          {prices.map((p, id) => (
            <ListItem key={id} filter={{ min: p.min, max: p.max }} active={`${p.max}` === `${max}`} text={p.name} />
          ))}
        </div>
        <br />
        <h4>Avg. Customer Review</h4>
        <div>
          {ratings.map((r, id) => (
            <ListItem key={id} filter={{ rating: r.rating }} active={`${r.rating}` === `${rating}`}>
              <Rating caption={' & up'} rating={r.rating}></Rating>
            </ListItem>
          ))}
        </div>
      </ul>
    </div>
  );
}
export default memo(SearchFilterColumn);
