import React from 'react';
import { useHistory } from 'react-router';
import { SORT } from '../constants';

export function _SortFilter({ order, getUrl }) {
  const history = useHistory();

  return (
    <div className="sort__filter">
      <label htmlFor="filter__options">Sort by</label>
      <div className="sprite__caret"></div>
      <select
        id="filter__options"
        value={order}
        onChange={(e) => {
          history.push(getUrl({ order: e.target.value }));
        }}
      >
        <optgroup label="Sort by:">
          {Object.values(SORT).map((filter, id) => (
            <option value={filter.OPT} key={id}>
              {filter.LABEL}
            </option>
          ))}
        </optgroup>
      </select>
    </div>
  );
}

const SortFilter = React.memo(_SortFilter);
export default SortFilter;
