import { memo, useRef } from 'react';

import SearchBox from './SearchBox';
// import { OutlineProvider } from './useOutline';
//import { useOutsideClick } from './useOutsideClick';

function NavSearch() {
  const navSearchRef: Ref<HTMLDivElement> = useRef<HTMLDivElement>();
  // useOutsideClick(navSearchRef);

  return (
    <div ref={navSearchRef} className="nav__search">
      <SearchBox />
    </div>
  );
}

export default memo(NavSearch);
