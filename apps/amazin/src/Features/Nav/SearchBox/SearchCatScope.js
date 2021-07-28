import React from 'react';

import { useOutline } from './useOutline';
import { useShadow } from '../../../utils/useShadow';
import { getCatLabel, SHADOW } from '../../../constants';

export function _SearchCatScope({ activeCat }) {
  const { setOutline, scopeOutline, setScopeOutline, setSuggestBox } =
    useOutline();
  const { setShadowOf } = useShadow('');

  return (
    <div className="search-box__cat-scope">
      <div
        className={`cat-scope ${scopeOutline ? 'focus' : ''}`}
        tabIndex="1"
        onClick={() => {
          setOutline(false);
          setScopeOutline(1 - scopeOutline);
          setSuggestBox(false);
          setShadowOf(SHADOW.SCOPE);
        }}
      >
        <div className="cat-scope--facade">
          <span>{getCatLabel(activeCat)}</span>
          <i className="fa fa-caret-down"></i>
        </div>
      </div>
    </div>
  );
}

const SearchCatScope = React.memo(_SearchCatScope);
export default SearchCatScope;
