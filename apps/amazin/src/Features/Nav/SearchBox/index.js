import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import SearchBtn from './SearchBtn';
import SearchCatDropdown from './SearchCatDropdown';
import SearchCatScope from './SearchCatScope';
import SearchInput from './SearchInput';
import SearchSuggest from './SearchSuggest';
import { OutlineProvider, useOutline } from './useOutline';
import { useShadow } from '../../../utils/useShadow';
import { NAV, SHADOW } from '../../../constants';

function NavSearch() {
  const history = useHistory();
  const { shadowOf, clearShadow } = useShadow('');

  const { outline, setScopeOutline, setSuggestBox } = useOutline();
  const [activeCat, setActiveCat] = useState(NAV.ALL);
  const [input, setInput] = useState('');
  const [suggests, setSuggests] = useState([]);

  const ref = useRef(null);

  const submitHandler = (e) => {
    e?.preventDefault();
    if (input) {
      setSuggestBox(false);
      clearShadow();
      history.push(`/search/category/${activeCat}/name/${input}`);
    }
  };

  const handleClick = useCallback(
    (e) => {
      if (!ref.current.contains(e.target)) {
        setSuggestBox(false);
        setScopeOutline(0);
        clearShadow();
      }
      return e;
    },
    [ref, setSuggestBox, setScopeOutline, clearShadow]
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
  }, [setScopeOutline, shadowOf, handleClick]);

  return (
    <form ref={ref} className={`search-box ${outline ? 'focus' : ''}`}>
      <div className="row--left">
        <SearchCatScope activeCat={activeCat} />

        <SearchCatDropdown hook={[activeCat, setActiveCat]} />
      </div>

      <div className="row--fill">
        <SearchInput
          input={input}
          control={{ setInput, setSuggests, submitHandler }}
        />

        <SearchSuggest
          suggests={!!input && suggests}
          control={{ setInput, setSuggests }}
        />
      </div>

      <div className="row--right">
        <SearchBtn submitHandler={submitHandler} />
      </div>
    </form>
  );
}

const SearchBox = React.memo(() => (
  <OutlineProvider>
    <div className="nav__search">
      <NavSearch />
    </div>
  </OutlineProvider>
));
export default SearchBox;
