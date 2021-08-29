import { memo, useRef } from 'react';
import SearchBox from './SearchBox';
import { OutlineProvider } from './useOutline';
import { useOutsideClick } from './useOutsideClick';

function NavSearch() {
  const navSearchRef = useRef();
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
