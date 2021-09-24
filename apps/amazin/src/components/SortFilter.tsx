import { memo } from 'react';
import { useHistory } from 'react-router';

import { SORT } from '../constants';

function SortFilter({ order = SORT.BESTSELLING.OPT, getUrl }: { order?: string; getUrl: FnType }) {
  const history = useHistory();
  const changeFilter = (e: EventType) => history.push(getUrl({ order: e.target.value }));

  return (
    <div className="sort__filter">
      <label htmlFor="filter__options">Sort by</label>
      <div className="sprite__caret"></div>
      <select id="filter__options" value={order} onChange={changeFilter}>
        <optgroup label="Sort by:">
          {Object.values(SORT).map(({ OPT, LABEL }) => (
            <option value={OPT} key={OPT}>
              {LABEL}
            </option>
          ))}
        </optgroup>
      </select>
    </div>
  );
}

export default memo(SortFilter);
