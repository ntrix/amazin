import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listAllProducts } from 'src/apis/productAPI';
import { useOutline } from '../../useOutline';
import { NAV } from 'src/constants';
import SearchCatItem from './SearchCatItem';

function SearchCatDropdown({ activeCat, setActiveCat }) {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.productCategoryList);
  const { scopeOutline } = useOutline();

  useEffect(() => {
    dispatch(listAllProducts({ category: activeCat }));
  }, [dispatch, activeCat]);

  return scopeOutline > 0 && categories ? (
    <div className="cat-scope__dropdown">
      <ul className="dropdown__list">
        {[NAV.ALL, ...categories].map((cat, key) => (
          <SearchCatItem key={key} cat={cat} isActive={activeCat === cat} setActiveCat={setActiveCat} />
        ))}
      </ul>
    </div>
  ) : null;
}

export default memo(SearchCatDropdown, (prev, next) => prev.activeCat === next.activeCat);
