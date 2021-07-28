import React from 'react';
import { Link } from 'react-router-dom';

import { SEARCH } from '../../../constants';
import { useShadow } from '../../../utils/useShadow';

export function _SearchSuggest({
  hook: [suggests, setSuggests],
  share: { setInput, setSuggestWindow }
}) {
  const { clearShadow } = useShadow();
  return (
    <div className="search__suggest">
      <ul>
        {suggests?.slice(0, SEARCH.MAX_SUGGESTS).map((p, id) => (
          <li key={id}>
            <Link
              to={`/search/name/${p.name.replace(/(<b>)|(<\/b>)/g, '')}`}
              dangerouslySetInnerHTML={{ __html: p.name }}
              onClick={() => {
                setSuggestWindow(false);
                setInput(p.name.replace(/(<b>)|(<\/b>)/g, ''));
                setSuggests([]);
                clearShadow();
              }}
            ></Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const SearchSuggest = React.memo(_SearchSuggest);
export default SearchSuggest;
