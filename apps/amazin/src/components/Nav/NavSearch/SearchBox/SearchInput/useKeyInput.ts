import { useOutline } from '../../useOutline';
import { useShadow } from 'src/hooks/useShadow';
import { findSuggest, getPlainText } from 'src/utils';
import { SEARCH, SHADOW } from 'src/constants';

const LAST_S = SEARCH.MAX_SUGGESTS - 1;
export function useKeyInput(setInput: SetStateType<string>, submitSearch: FnType) {
  const { productList, suggests, setSuggests, activeSuggest, setActiveSuggest, setOutline, setSuggestBox } =
    useOutline();
  const { setShadowOf } = useShadow();

  const handleKeyInput: FnType = ({ target: { value }, key }: EventType) => {
    if (!value) return;
    setSuggestBox(true);

    switch (key) {
      case 'ArrowDown':
        return suggests.length && setActiveSuggest(Math.min(activeSuggest + 1, LAST_S, suggests.length - 1));

      case 'ArrowUp':
        return suggests.length && setActiveSuggest(Math.max(activeSuggest - 1, 0));

      case 'Enter':
        if (activeSuggest < 0) return submitSearch();
        return setInput(getPlainText(suggests?.[activeSuggest]?.name.slice(0, 50)));

      case 'Escape':
        setActiveSuggest(-1);
        setSuggestBox(false);
        return setShadowOf('');
    }
    const newSuggests = findSuggest(productList, value);
    setSuggests(newSuggests);
    setActiveSuggest(Math.min(activeSuggest, newSuggests.length - 1));
    setInput(value);
    if (!newSuggests.length) return setShadowOf('');

    setShadowOf(SHADOW.NAV_SEARCH);
    return setOutline(true);
  };

  return { handleKeyInput };
}
