import { useOutline } from '../../useOutline';
import { SEARCH } from 'src/constants';
import { useShadow } from 'src/hooks/useShadow';
import SuggestRow from './SuggestRow';

type PropType = {
  setInput: SetStateType<string>;
};

export default function SearchSuggests({ setInput }: PropType) {
  const { activeSuggest, suggests, setSuggests, setSuggestBox } = useOutline();
  const { setShadowOf } = useShadow();

  return suggests?.slice(0, SEARCH.MAX_SUGGESTS).map(
    (product, id) =>
      !!product && (
        <li key={id} className={activeSuggest === id ? 'active' : ''}>
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
  );
}
