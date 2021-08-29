import { memo } from 'react';
import { useOutline } from '../../useOutline';
import { CatLabel } from 'src/constants';
import { useClickOrFocus } from './useClickFocus';

function SearchCatScope({ activeCat }) {
  const { scopeOutline, setScopeOutline } = useOutline();
  const { onClickOrFocus } = useClickOrFocus();
  const wrapClass = `cat-scope ${scopeOutline ? 'focus' : ''}`;
  const doThenBlur = () => () => setScopeOutline(1 - scopeOutline);
  return (
    <div className="search-box__cat-scope" aria-label="category search scope">
      <div className={wrapClass} tabIndex="1" onClick={onClickOrFocus} onFocus={onClickOrFocus} onBlur={doThenBlur}>
        <div className="cat-scope--facade">
          <span>{CatLabel[activeCat] ?? activeCat}</span>
          <i className="fa fa-caret-down"></i>
        </div>
      </div>
    </div>
  );
}
export default memo(SearchCatScope);
