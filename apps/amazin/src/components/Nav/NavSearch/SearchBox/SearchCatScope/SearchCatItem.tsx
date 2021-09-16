import { memo } from 'react';

import { useOutline } from '../../useOutline';
import { useShadow } from 'src/hooks/useShadow';
import { CatLabel, Scope } from 'src/constants';

type PropType = {
  cat: string;
  isActive?: boolean;
  setActiveCat: SetState;
};

function SearchCatItem({ cat, isActive, setActiveCat }: PropType) {
  const { setShadowOf } = useShadow();
  const { inputRef, setOutline, setScopeOutline, setSuggestBox } = useOutline();

  return (
    <li
      className={`category ${isActive ? 'active' : ''}`}
      onClick={() => {
        if (isActive) {
          setOutline(false);
          setScopeOutline(Scope.facade); // focus back to search scope facade
          return;
        }
        inputRef.current.focus();
        setActiveCat(cat);
        setScopeOutline(Scope.hide); // jump focus on input field, therefore hide scope outline
        setSuggestBox(false);
        setShadowOf('');
      }}
    >
      <i className="fa fa-check" /> {CatLabel[cat] ?? cat}
    </li>
  );
}

export default memo(SearchCatItem);
