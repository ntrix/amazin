import { memo } from 'react';

import { useOutline } from '../../useOutline';
import { SEARCH } from 'src/constants';
import { useShadow } from 'src/hooks/useShadow';
import SuggestRow from './SuggestRow';

export type SearchSuggestsProps = {
  suggests: PNameType[];
  setSuggests: SetStateType<PNameType[]>;
  setInput: SetStateType<string>;
};

function SearchSuggests({ suggests, setSuggests, setInput }: SearchSuggestsProps) {
  const { setSuggestBox } = useOutline();
  const { setShadowOf } = useShadow();

  return (
    <div className="search__suggest">
      <ul>
        {suggests?.slice(0, SEARCH.MAX_SUGGESTS).map(
          (product, id) =>
            !!product && (
              <li key={id}>
                <SuggestRow
                  row={product.name}
                  onClick={(text) => {
                    setSuggestBox(false);
                    setInput(text);
                    setSuggests([]);
                    setShadowOf('');
                  }}
                />
              </li>
            )
        )}
      </ul>
    </div>
  );
}

export default memo(SearchSuggests);
