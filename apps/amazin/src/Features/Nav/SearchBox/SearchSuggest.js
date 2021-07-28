import React from 'react';
import { Link } from 'react-router-dom';

import { SEARCH, SHADOW } from '../../../constants';
import { useShadow } from '../../../utils/useShadow';
import { useOutline } from './useOutline';

export function _SearchSuggest({
  suggests,
  control: { setSuggests, setInput }
}) {
  const { suggestBox, setSuggestBox } = useOutline();
  const { shadowOf, clearShadow } = useShadow();

  if (!suggests || SHADOW.SEARCH_BOX !== shadowOf || !suggestBox) return null;
  return (
    <div className="search__suggest">
      <ul>
        {suggests?.slice(0, SEARCH.MAX_SUGGESTS).map((p, id) => (
          <li key={id}>
            <Link
              to={`/search/name/${p.name.replace(/(<b>)|(<\/b>)/g, '')}`}
              dangerouslySetInnerHTML={{ __html: p.name }}
              onClick={() => {
                setSuggestBox(false);
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
