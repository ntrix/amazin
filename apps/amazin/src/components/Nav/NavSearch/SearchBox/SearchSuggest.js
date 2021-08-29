import { memo } from 'react';
import { Link } from 'react-router-dom';
import { SEARCH, SHADOW } from '../../../../constants';
import { useShadow } from '../../../../hooks/useShadow';
import { useOutline } from '../useOutline';

function SearchSuggest({ suggests, control: { setSuggests, setInput } }) {
  const { suggestBox, setSuggestBox } = useOutline();
  const { shadowOf, setShadowOf } = useShadow();
  if (!suggests || SHADOW.NAV_SEARCH !== shadowOf || !suggestBox) return null;
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
                setShadowOf('');
              }}
            ></Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default memo(SearchSuggest);
