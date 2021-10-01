import { lazy, memo } from 'react';

import { SuspenseNull } from 'src/components/CustomSuspense';
import { SHADOW } from 'src/constants';
import { useShadow } from 'src/hooks/useShadow';
import { useOutline } from '../useOutline';
import SearchInput from './SearchInput';
const SearchSuggests: Lazy = lazy((): LazyPromise => import(/* webpackPrefetch: true */ './SearchSuggests'));

function BoxMiddle(props: Props) {
  const { suggests, suggestBox } = useOutline();
  const { shadowOf } = useShadow();

  return (
    <div className="box__middle--fill">
      <SearchInput {...props} />

      <SuspenseNull>
        {!!(props.input && suggests.length && suggestBox && SHADOW.NAV_SEARCH === shadowOf) && (
          <div className="search__suggest">
            <ul children={<SearchSuggests setInput={props.setInput} />} />
          </div>
        )}
      </SuspenseNull>
    </div>
  );
}

export default memo(BoxMiddle);
