import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { NAV, SHADOW } from '../../../constants';
import { useShadow } from '../../../utils/useGlobal';
import SearchBtn from './SearchBtn';
import SearchCatDropdown from './SearchCatDropdown';
import SearchCatScope from './SearchCatScope';
import SearchInput from './SearchInput';
import SearchSuggest from './SearchSuggest';

export function _SearchBox() {
  const history = useHistory();
  const { shadowOf, clearShadow } = useShadow('');

  const [searchBoxOutline, setSearchBoxOutline] = useState(false);
  const [scopeOutline, setScopeOutline] = useState(0);
  const [activeCat, setActiveCat] = useState(NAV.ALL);
  const [input, setInput] = useState('');
  const [suggests, setSuggests] = useState([]);
  const [suggestWindow, setSuggestWindow] = useState(false);

  const searchBoxRef = useRef(null);
  const searchInputRef = useRef(null);

  const share = {
    searchInputRef,
    setInput,
    scopeOutline,
    setScopeOutline,
    setSearchBoxOutline,
    setSuggests,
    setSuggestWindow
  };

  const submitHandler = (e) => {
    e?.preventDefault();
    if (input) {
      setSuggestWindow(false);
      clearShadow();
      history.push(`/search/category/${activeCat}/name/${input}`);
    }
  };

  const handleClick = useCallback(
    (e) => {
      if (!searchBoxRef.current.contains(e.target)) {
        setSuggestWindow(false);
        setScopeOutline(0);
        clearShadow();
      }
      return e;
    },
    [searchBoxRef, clearShadow]
  );

  /* detect click outside component to close categories search scope window */
  useEffect(() => {
    if (SHADOW.SCOPE === shadowOf)
      document.addEventListener('mousedown', handleClick);
    if (SHADOW.NAV_DD === shadowOf) {
      document.removeEventListener('mousedown', handleClick);
      setScopeOutline(0);
    }
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [scopeOutline, shadowOf, handleClick]);

  return (
    <form
      ref={searchBoxRef}
      className={`search-box ${searchBoxOutline ? 'focus' : ''}`}
    >
      <div className="row--left">
        <SearchCatScope activeCat={activeCat} share={share} />
        <SearchCatDropdown hook={[activeCat, setActiveCat]} share={share} />
      </div>

      <div className="row--fill">
        <SearchInput
          hook={[input, setInput]}
          submitHandler={submitHandler}
          share={share}
        />
        {SHADOW.SEARCH_BOX === shadowOf && suggestWindow && !!input && (
          <SearchSuggest hook={[suggests, setSuggests]} share={share} />
        )}
      </div>

      <div className="row--right">
        <SearchBtn submitHandler={submitHandler} />
      </div>
    </form>
  );
}

const SearchBox = React.memo(_SearchBox);
export default SearchBox;
