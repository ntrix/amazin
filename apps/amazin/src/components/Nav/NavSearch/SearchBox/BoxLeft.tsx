import { lazy, memo } from 'react';

import { SuspenseNull } from 'src/components/CustomSuspense';
import SearchCatScope from './SearchCatScope';
const SearchCatDropdown = lazy(() => import(/* webpackPrefetch: true */ './SearchCatScope/SearchCatDropdown'));

function BoxLeft(props: Props) {
  return (
    <div className="box__left">
      <SearchCatScope {...props} />
      <SuspenseNull children={<SearchCatDropdown {...props} />} />
    </div>
  );
}

export default memo(BoxLeft);
