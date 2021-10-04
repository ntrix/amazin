import { lazy, memo, useState } from 'react';

import { SearchSuggestsProps } from './SearchSuggests';
import SearchInput, { SearchInputProps } from './SearchInput';
import { SuspenseNull } from 'src/components/CustomSuspense';
import { SHADOW } from 'src/constants';
import { useShadow } from 'src/hooks/useShadow';
import { useOutline } from '../useOutline';
const SearchSuggests: Lazy = lazy((): LazyPromise => import(/* webpackPrefetch: true */ './SearchSuggests'));

function BoxMiddle(props: SearchSuggestsProps & SearchInputProps) {
  const [suggests, setSuggests] = useState<PNameType[]>([]);
  const { suggestBox } = useOutline();
  const { shadowOf } = useShadow();

  return (
    <div className="box__middle--fill">
      <SearchInput {...props} setSuggests={setSuggests} />

      <SuspenseNull>
        {!!(props.input && suggests.length && suggestBox && SHADOW.NAV_SEARCH === shadowOf) && (
          <SearchSuggests suggests={suggests} setInput={props.setInput} setSuggests={setSuggests} />
        )}
      </SuspenseNull>
    </div>
  );
}

export default memo(BoxMiddle);
