import { lazy, memo, Suspense, useState } from 'react';
import { SHADOW } from 'src/constants';
import { useShadow } from 'src/hooks/useShadow';
import { useOutline } from '../useOutline';
import SearchInput from './SearchInput';
const SearchSuggests = lazy(() => import(/* webpackPrefetch: true */ './SearchSuggests'));
function BoxMiddle(props) {
  const { suggestBox } = useOutline();
  const { shadowOf } = useShadow();
  const [suggests, setSuggests] = useState([]);
  return (
    <div className="row--fill">
      <SearchInput {...props} setSuggests={setSuggests} />
      <Suspense fallback={null}>
        {!!(props.input && suggests && suggestBox & (SHADOW.NAV_SEARCH === shadowOf)) && (
          <div className="search__suggest">
            <ul children={<SearchSuggests suggests={suggests} setInput={props.setInput} setSuggests={setSuggests} />} />
          </div>
        )}
      </Suspense>
    </div>
  );
}
export default memo(BoxMiddle);
