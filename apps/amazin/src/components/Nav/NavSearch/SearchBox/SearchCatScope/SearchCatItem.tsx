import { memo } from 'react';

import { useOutline } from '../../useOutline';
import { useShadow } from 'src/hooks/useShadow';
import { CatLabel } from 'src/constants';

type PropType = {
  cat: string;
  isActive?: boolean;
  setActiveCat: SetState;
};

function SearchCatItem({ cat, isActive, setActiveCat }: PropType) {
  const { setShadowOf } = useShadow();
  const { inputRef, setOutline, setScopeOutline, setSuggestBox } = useOutline();

  const hideAllEffect = (e: EventType) => {
    setSuggestBox(false);
    setScopeOutline(0);
    setOutline(false);
  };

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
    >
      <i className="fa fa-check" /> {CatLabel[cat] ?? cat}
    </li>
  );
}

export default memo(SearchCatItem);
