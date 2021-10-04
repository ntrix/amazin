import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SearchCatScopeProps } from '.';
import { listAllProducts } from 'src/apis/productAPI';
import { useOutline } from '../../useOutline';
import { NAV, Scope } from 'src/constants';
import SearchCatItem from './SearchCatItem';

function SearchCatDropdown({ activeCat, setActiveCat }: SearchCatScopeProps) {
  const dispatch = useDispatch();
  const { categories } = useSelector((state: AppState) => state.productCategoryList);
  const { scopeOutline, setScopeOutline } = useOutline();

  useEffect(() => {
    dispatch(listAllProducts({ category: activeCat }));
  }, [activeCat, dispatch]);

  return scopeOutline === Scope.expanded && categories ? (
    <>
      <label
        className="scope click-catcher"
        aria-label="close scope area"
        onClick={() => setScopeOutline(Scope.hide)}
      />
      <div className="cat-scope__dropdown">
        <ul className="dropdown__list">
          {[NAV.ALL, ...categories].map((cat) => (
            <SearchCatItem key={cat} cat={cat} isActive={activeCat === cat} setActiveCat={setActiveCat} />
          ))}
        </ul>
      </div>
    </>
  ) : null;
}

export default memo(SearchCatDropdown, (prev, next) => prev.activeCat === next.activeCat);
