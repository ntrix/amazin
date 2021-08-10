import React from 'react';

export function _SearchBtn({ submitHandler }) {
  return (
    <div className="search__btn" onClick={submitHandler}>
      <span className="sprite__search-btn" tabIndex="3" aria-label="Go">
        <input type="submit" value="Go"></input>
      </span>
    </div>
  );
}

const SearchBtn = React.memo(_SearchBtn);
export default SearchBtn;
