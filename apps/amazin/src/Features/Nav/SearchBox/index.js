import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import { useHistory } from 'react-router-dom';

import SearchCatScope from './SearchCatScope';
import SearchInput from './SearchInput';
import SearchBtn from './SearchBtn';
import { OutlineProvider, useOutline } from './useOutline';
import { useShadow } from '../../../utils/useShadow';
import { NAV, SHADOW } from '../../../constants';

const SearchCatDropdown = lazy(() =>
  import(/* webpackPrefetch: true */ './SearchCatDropdown')
);
const SearchSuggest = lazy(() =>
  import(/* webpackPrefetch: true */ './SearchSuggest')
);

function NavSearch() {
  const history = useHistory();
  const { shadowOf, setShadowOf } = useShadow();

  const { outline, setScopeOutline, setSuggestBox } = useOutline();
  const [activeCat, setActiveCat] = useState(NAV.ALL);
  const [input, setInput] = useState('');
  const [suggests, setSuggests] = useState([]);

  const SearchBoxRef = useRef(null);

  const submitHandler = (e) => {
    e?.preventDefault();
    if (input) {
      setSuggestBox(false);
      setShadowOf('');
      history.push(`/search/category/${activeCat}/name/${input}`);
    }
  };

  const handleClick = useCallback(
    (e) => {
      if (!SearchBoxRef.current.contains(e.target)) {
        setSuggestBox(false);
        setScopeOutline(0);
        setShadowOf('');
      }
      return e;
    },
    [SearchBoxRef, setSuggestBox, setScopeOutline, setShadowOf]
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
    <form ref={SearchBoxRef} className={`search-box ${outline ? 'focus' : ''}`}>
      <div className="row--left">
        <SearchCatScope activeCat={activeCat} />

        <Suspense fallback={null}>
          <SearchCatDropdown hook={[activeCat, setActiveCat]} />
        </Suspense>
      </div>

      <div className="row--fill">
        <SearchInput
          input={input}
          control={{ setInput, setSuggests, submitHandler }}
        />

        <Suspense fallback={null}>
          <SearchSuggest
            suggests={!!input && suggests}
            control={{ setInput, setSuggests }}
          />
        </Suspense>
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
