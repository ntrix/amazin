import { memo } from 'react';

function SearchBtn({ submitSearch }) {
  const handleKeyPress = (e: EventType) => {
    if (e?.key === 'Enter' || e?.key === ' ') submitSearch();
  };

  return (
    <div className="search__btn" tabIndex={1} aria-label="Go" onClick={submitSearch} onKeyUp={handleKeyPress}>
      <span className="sprite__search-btn">
        <input type="submit" value="Go"></input>
      </span>
    </div>
  );
}

export default memo(SearchBtn);
