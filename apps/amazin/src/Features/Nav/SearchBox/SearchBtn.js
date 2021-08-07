import React from 'react';

export function _SearchBtn({ submitHandler }) {
  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' || e?.key === ' ') submitHandler();
  };

  return (
    <div
      className="search__btn"
      tabindex="1"
      aria-label="Go"
      onClick={submitHandler}
      onKeyUp={handleKeyPress}
    >
      <span className="sprite__search-btn">
        <input type="submit" value="Go"></input>
      </span>
    </div>
  );
}

const SearchBtn = React.memo(_SearchBtn);
export default SearchBtn;
