import { useOutline } from '../../useOutline';
import { SEARCH } from 'src/constants';
import { useShadow } from 'src/hooks/useShadow';
import SuggestRow from './SuggestRow';

type PropType = {
  suggests: PNameType[];
  setSuggests: SetState;
  setInput: SetState;
};

export default function SearchSuggests({ suggests, setSuggests, setInput }: PropType) {
  const { setSuggestBox } = useOutline();
  const { setShadowOf } = useShadow();

  return suggests?.slice(0, SEARCH.MAX_SUGGESTS).map((product, id) => (
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
  ));
}
