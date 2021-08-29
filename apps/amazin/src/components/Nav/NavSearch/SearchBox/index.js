import { lazy, Suspense, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SearchCatScope from './SearchCatScope';
import SearchInput from './SearchInput';
import SearchBtn from './SearchBtn';
import { useOutline } from '../useOutline';
import { useShadow } from '../../../../hooks/useShadow';
import { NAV } from '../../../../constants';
const SearchCatDropdown = lazy(() => import(/* webpackPrefetch: true */ './SearchCatDropdown'));
const SearchSuggest = lazy(() => import(/* webpackPrefetch: true */ './SearchSuggest'));

export default function SearchBox(props) {
  const history = useHistory();
  const { setShadowOf } = useShadow();
  const { setSuggestBox } = useOutline();
  const [activeCat, setActiveCat] = useState(NAV.ALL);
  const [input, setInput] = useState('');
  const [suggests, setSuggests] = useState([]);

  const submitHandler = (e) => {
    e?.preventDefault();
    if (input) {
      setSuggestBox(false);
      setShadowOf('');
      history.push(`/search/category/${activeCat}/name/${input}`);
    }
  };

  return (
    <form {...props}>
      <div className="row--left">
        <SearchCatScope activeCat={activeCat} />
        <Suspense fallback={null}>
          <SearchCatDropdown hook={[activeCat, setActiveCat]} />
        </Suspense>
      </div>
      <div className="row--fill">
        <SearchInput input={input} control={{ setInput, setSuggests, submitHandler }} />
        <Suspense fallback={null}>
          <SearchSuggest suggests={!!input && suggests} control={{ setInput, setSuggests }} />
        </Suspense>
      </div>
      <div className="row--right">
        <SearchBtn submitHandler={submitHandler} />
      </div>
    </form>
  );
}
