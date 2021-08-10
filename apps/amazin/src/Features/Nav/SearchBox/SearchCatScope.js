import React from 'react';

import { getCatLabel, SHADOW } from '../../../constants';
import { useShadow } from '../../../utils/useGlobal';

export function _SearchCatScope({
  activeCat,
  share: {
    scopeOutline,
    setScopeOutline,
    setSearchBoxOutline,
    setSuggestWindow
  }
}) {
  const { setShadowOf } = useShadow('');

  return (
    <div className="search-box__cat-scope">
      <div
        className={`cat-scope ${scopeOutline ? 'focus' : ''}`}
        tabIndex="1"
        onClick={() => {
          setSearchBoxOutline(false);
          setScopeOutline(1 - scopeOutline);
          setSuggestWindow(false);
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
