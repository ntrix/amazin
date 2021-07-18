import React from 'react';
import { useHistory } from 'react-router';

export default function SortFilter({ order, getUrl }) {
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
          <option value="newest">Newest Arrivals</option>
          <option value="bestselling">Best Selling</option>
          <option value="lowest">Price: Low to High</option>
          <option value="highest">Price: High to Low</option>
          <option value="toprated">Avg. Rating</option>
        </optgroup>
      </select>
    </div>
  );
}
