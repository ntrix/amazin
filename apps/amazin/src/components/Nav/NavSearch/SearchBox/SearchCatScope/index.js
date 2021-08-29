import { memo } from 'react';
import { useOutline } from '../../useOutline';
import { useShadow } from '../../../../../hooks/useShadow';
import { getCatLabel, SHADOW } from '../../../../../constants';

function SearchCatScope({ activeCat }) {
  const { setOutline, scopeOutline, setScopeOutline, setSuggestBox } = useOutline();
  const { setShadowOf } = useShadow();
  const onClickOrFocus = () => {
    setOutline(false);
    setScopeOutline(scopeOutline ? 1 - scopeOutline : -1);
    setSuggestBox(false);
    setShadowOf(SHADOW.SCOPE);
  };
  return (
    <div className="search-box__cat-scope">
      <div
        className={`cat-scope ${scopeOutline ? 'focus' : ''}`}
        tabIndex="1"
        aria-label="category search scope"
        onClick={onClickOrFocus}
        onFocus={onClickOrFocus}
        onBlur={() => () => setScopeOutline(1 - scopeOutline)}
      >
        <div className="cat-scope--facade">
          <span>{getCatLabel(activeCat)}</span>
          <i className="fa fa-caret-down"></i>
        </div>
      </div>
    </div>
  );
}
export default memo(SearchCatScope);
