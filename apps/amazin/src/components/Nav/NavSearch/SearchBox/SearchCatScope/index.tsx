import { memo } from 'react';

import { CatLabel, Scope, SHADOW } from 'src/constants';
import { useShadow } from 'src/hooks/useShadow';
import { useOutline } from '../../useOutline';

export type SearchCatScopeProps = {
  activeCat: string;
  setActiveCat: SetState;
};

function SearchCatScope({ activeCat }: SearchCatScopeProps) {
  const { setShadowOf } = useShadow();
  const { setOutline, scopeOutline, setScopeOutline, setSuggestBox } = useOutline();

  const clickHandler = () => {
    setOutline(false);
    setScopeOutline(scopeOutline === Scope.hide ? Scope.minimized : -scopeOutline);
    setSuggestBox(false);
    setShadowOf(SHADOW.SCOPE);
  };

  const focusHandler = () => scopeOutline === Scope.hide && clickHandler();

  const wrapClass = `cat-scope ${scopeOutline === Scope.hide ? '' : 'focus'}`;

  return (
    <div className="search-box__cat-scope" aria-label="category search scope">
      <div className={wrapClass} tabIndex={1} onClick={clickHandler} onFocus={focusHandler}>
        <div className="cat-scope--facade">
          <span>{CatLabel[activeCat] ?? activeCat}</span>
          <i className="fa fa-caret-down"></i>
        </div>
      </div>
    </div>
  );
}

export default memo(SearchCatScope);
