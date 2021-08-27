import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listAllProducts } from '../../../apis/productAPI';

import { useOutline } from './useOutline';
import { useShadow } from '../../../utils/useShadow';
import { getCatLabel, NAV } from '../../../constants';

export function _SearchCatDropdown({ hook: [activeCat, setActiveCat] }) {
  const dispatch = useDispatch();
  const { success, categories } = useSelector(
    (state) => state.productCategoryList
  );
  const { inputRef, setOutline, scopeOutline, setScopeOutline, setSuggestBox } =
    useOutline();
  const { setShadowOf } = useShadow();

  useEffect(() => {
    dispatch(listAllProducts({ category: activeCat }));
  }, [dispatch, activeCat, success]);

  return scopeOutline > 0 && categories ? (
    <div className="cat-scope__dropdown">
      <ul className="dropdown__list">
        {[NAV.ALL, ...categories].map((cat, i) => (
          <li
            key={i}
            className={`category ${cat === activeCat ? 'active' : ''}`}
            onClick={() => {
              if (cat === activeCat) {
                setOutline(false);
                setScopeOutline(-1);
                return;
              }
              inputRef.current.focus();
              setActiveCat(cat);
              setScopeOutline(0);
              setSuggestBox(false);
              setShadowOf('');
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
