import { lazy, memo, useState } from 'react';

import { SuspenseNull } from 'src/components/CustomSuspense';
import { SHADOW } from 'src/constants';
import { useShadow } from 'src/hooks/useShadow';
import { useOutline } from '../useOutline';
import SearchInput from './SearchInput';
const SearchSuggests = lazy(() => import(/* webpackPrefetch: true */ './SearchSuggests'));

function BoxMiddle(props) {
  const [suggests, setSuggests] = useState([]);
  const { suggestBox } = useOutline();
  const { shadowOf } = useShadow();

  return (
    <div className="row--fill">
      <SearchInput {...props} setSuggests={setSuggests} />

      <SuspenseNull>
        {!!(props.input && suggests && suggestBox & (SHADOW.NAV_SEARCH === shadowOf)) && (
          <div className="search__suggest">
            <ul children={<SearchSuggests suggests={suggests} setInput={props.setInput} setSuggests={setSuggests} />} />
          </div>
        )}
      </SuspenseNull>
    </div>
  );
}

export default memo(BoxMiddle);
