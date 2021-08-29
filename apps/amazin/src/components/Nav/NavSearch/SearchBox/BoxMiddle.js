import { lazy, Suspense, useState } from 'react';
import SearchInput from './SearchInput';
const SearchSuggest = lazy(() => import(/* webpackPrefetch: true */ './SearchSuggest'));

export default function BoxMiddle(props) {
  const [suggests, setSuggests] = useState([]);

  return (
    <div className="row--fill">
      <SearchInput {...props} setSuggests={setSuggests} />
      <Suspense fallback={null}>
        <SearchSuggest suggests={!!props.input && suggests} setInput={props.setInput} setSuggests={setSuggests} />
      </Suspense>
    </div>
  );
}
