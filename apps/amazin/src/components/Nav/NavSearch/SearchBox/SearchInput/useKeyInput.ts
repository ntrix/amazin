import { useOutline } from '../../useOutline';
import { useShadow } from 'src/hooks/useShadow';
import { findSuggest, getPlainText } from 'src/utils';
import { SEARCH, SHADOW } from 'src/constants';

export function useKeyInput(setInput: SetStateType<string>, submitSearch: FnType) {
  const { productList, suggests, setSuggests, activeSuggest, setActiveSuggest, setOutline, setSuggestBox } =
    useOutline();
  const { setShadowOf } = useShadow();

  const handleKeyInput: FnType = ({ target: { value }, key }: EventType) => {
    switch (key) {
      case 'ArrowUp':
        setSuggestBox(true);
        return suggests.length && setActiveSuggest(activeSuggest > 0 ? activeSuggest - 1 : 0);
      case 'ArrowDown':
        setSuggestBox(true);
        return (
          suggests.length &&
          activeSuggest < Math.min(SEARCH.MAX_SUGGESTS, suggests.length) - 1 &&
          setActiveSuggest(activeSuggest + 1)
        );
      case 'Enter':
        if (activeSuggest === -1) return submitSearch();
        setActiveSuggest(-1);
        setInput(getPlainText(suggests[activeSuggest].name));
        break;

      case 'Escape':
        setActiveSuggest(-1);
        setSuggestBox(false);
        return setShadowOf('');

      default:
    }
    const newSuggests = findSuggest(productList, value);
    setSuggests(newSuggests);
    // setActiveSuggest(Math.min(activeSuggest, newSuggests.length - 1));
    setSuggestBox(true);
    setInput(value);
    if (!newSuggests.length) return setShadowOf('');

    setShadowOf(SHADOW.NAV_SEARCH);
    return setOutline(true);
  };

  return { handleKeyInput };
}
