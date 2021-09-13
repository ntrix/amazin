import { memo, useRef } from 'react';

import { OutlineProvider } from './useOutline';
import { useOutsideClick } from './useOutsideClick';
import SearchBox from './SearchBox';

function NavSearch() {
  const navSearchRef: Ref<HTMLDivElement> = useRef<HTMLDivElement>();
  useOutsideClick(navSearchRef);

  return (
    <div ref={navSearchRef} className="nav__search">
      <SearchBox />
    </div>
  );
}

const NavSearchMemo = memo(NavSearch);

function NavSearchWithOutline() {
  return (
    <OutlineProvider>
      <NavSearchMemo />
    </OutlineProvider>
  );
}

export default memo(NavSearchWithOutline);
