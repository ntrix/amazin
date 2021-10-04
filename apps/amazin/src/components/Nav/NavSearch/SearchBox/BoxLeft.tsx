import { lazy, memo } from 'react';

import SearchCatScope, { SearchCatScopeProps } from './SearchCatScope';
import { SuspenseNull } from 'src/components/CustomSuspense';
const SearchCatDropdown: Lazy = lazy(
  (): LazyPromise => import(/* webpackPrefetch: true */ './SearchCatScope/SearchCatDropdown')
);

function BoxLeft(props: SearchCatScopeProps) {
  return (
    <div className="box__left">
      <SearchCatScope {...props} />
      <SuspenseNull>
        <SearchCatDropdown {...props} />
      </SuspenseNull>
    </div>
  );
}

export default memo(BoxLeft);
