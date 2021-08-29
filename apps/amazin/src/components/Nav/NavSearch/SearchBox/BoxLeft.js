import { lazy, Suspense } from 'react';
import SearchCatScope from './SearchCatScope';
const SearchCatDropdown = lazy(() => import(/* webpackPrefetch: true */ './SearchCatScope/SearchCatDropdown'));

export default function BoxLeft(props) {
  return (
    <div className="row--left">
      <SearchCatScope {...props} />
      <Suspense fallback={null}>
        <SearchCatDropdown {...props} />
      </Suspense>
    </div>
  );
}
