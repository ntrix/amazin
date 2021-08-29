import { memo, useRef } from 'react';
import SearchBox from './SearchBox';
import { OutlineProvider, useOutline } from './useOutline';
import { useOutsideClick } from './useOutsideClick';

function NavSearch() {
  const { outline } = useOutline();
  const NavSearchRef = useRef();
  useOutsideClick(NavSearchRef);
  return (
    <div ref={NavSearchRef} className="nav__search">
      <SearchBox className={`search-box ${outline ? 'focus' : ''}`} />
    </div>
  );
}
function NavSearchWithOutline() {
  return (
    <OutlineProvider>
      <NavSearch />
    </OutlineProvider>
  );
}
export default memo(NavSearchWithOutline);
