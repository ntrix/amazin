import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listAllProducts } from '../../../Controllers/productActions';

import { getCatLabel, NAV } from '../../../constants';
import { useShadow } from '../../../utils/useGlobal';

export function _SearchCatDropdown({
  hook: [activeCat, setActiveCat],
  share: {
    searchInputRef,
    scopeOutline,
    setScopeOutline,
    setSearchBoxOutline,
    setSuggestWindow
  }
}) {
  const dispatch = useDispatch();
  const { clearShadow } = useShadow('');
  const { success, categories } = useSelector(
    (state) => state.productCategoryList
  );

  useEffect(() => {
    dispatch(listAllProducts({ category: activeCat }));
  }, [dispatch, activeCat, success]);

  return scopeOutline > 0 && categories ? (
    <div className="cat-scope__dropdown">
      <ul className="dropdown__list">
        {[NAV.ALL, ...categories].map((cat, i) => (
          <li
            key={i}
            className={`category ${cat === activeCat ? 'selected' : ''}`}
            onClick={() => {
              if (cat === activeCat) {
                setSearchBoxOutline(false);
                setScopeOutline(-1);
                return;
              }
              searchInputRef.current.focus();
              setActiveCat(cat);
              setScopeOutline(0);
              setSuggestWindow(false);
              clearShadow();
            }}
            onBlur={() => setScopeOutline(0)}
          >
            <i className="fa fa-check"></i> {getCatLabel(cat)}
          </li>
        ))}
      </ul>
    </div>
  ) : null;
}

const SearchCatDropdown = React.memo(_SearchCatDropdown);
export default SearchCatDropdown;
