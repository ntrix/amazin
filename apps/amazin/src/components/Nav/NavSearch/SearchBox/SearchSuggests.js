import { Link } from 'react-router-dom';

import { useOutline } from '../useOutline';
import { SEARCH } from 'src/constants';
import { useShadow } from 'src/hooks/useShadow';

export default function SearchSuggests({ suggests, setSuggests, setInput }) {
  const { setSuggestBox } = useOutline();
  const { setShadowOf } = useShadow();

  return suggests?.slice(0, SEARCH.MAX_SUGGESTS).map((p, id) => (
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
      />
    </li>
  ));
}
