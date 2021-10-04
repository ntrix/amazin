import { memo } from 'react';

import { SearchCatScopeProps } from '.';
import { useOutline } from '../../useOutline';
import { useShadow } from 'src/hooks/useShadow';
import { CatLabel, Scope } from 'src/constants';

export type SearchCatItemProps = SearchCatScopeProps & {
  cat: string;
};

function SearchCatItem({ cat, activeCat, setActiveCat }: SearchCatItemProps) {
  const { setShadowOf } = useShadow();
  const { inputRef, setOutline, setScopeOutline, setSuggestBox } = useOutline();

  return (
    <li
      className={`category ${activeCat === cat ? 'active' : ''}`}
      onClick={() => {
        if (activeCat === cat) {
          setOutline(false);
          setScopeOutline(Scope.minimized); // focus back to search scope facade
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
