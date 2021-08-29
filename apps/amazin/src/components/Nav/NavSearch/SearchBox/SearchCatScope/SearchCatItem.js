import { memo } from 'react';
import { useOutline } from '../../useOutline';
import { useShadow } from 'src/hooks/useShadow';
import { CatLabel } from 'src/constants';

function SearchCatItem({ cat, isActive, setActiveCat }) {
  const { inputRef, setOutline, setScopeOutline, setSuggestBox } = useOutline();
  const { setShadowOf } = useShadow();
  return (
    <li
      className={`category ${isActive ? 'active' : ''}`}
      onClick={() => {
        if (isActive) {
          setOutline(false);
          setScopeOutline(-1);
          return;
        }
        inputRef.current.focus();
        setActiveCat(cat);
        setScopeOutline(0);
        setSuggestBox(false);
        setShadowOf('');
      }}
      onBlur={() => setScopeOutline(0)}
    >
      <i className="fa fa-check" /> {CatLabel[cat] ?? cat}
    </li>
  );
}
export default memo(SearchCatItem);
