import { useOutline } from '../../useOutline';
import { useShadow } from 'src/hooks/useShadow';
import { findSuggest, getPlainText } from 'src/utils';
import { SEARCH, SHADOW } from 'src/constants';

const LAST_SUGGEST = SEARCH.MAX_SUGGESTS - 1;

export function useInput(setInput: SetStateType<string>, submitSearch: FnType) {
  const { productList, suggests, setSuggests, activeSuggest, setActiveSuggest, setOutline } = useOutline();
  const { setShadowOf } = useShadow();

  const handleInput: FnType = (value: string) => {
    const newSuggests = findSuggest(productList, value);
    setSuggests(newSuggests);
    setActiveSuggest(Math.min(activeSuggest, newSuggests.length - 1));
    setInput(value);
    if (!newSuggests.length) return setShadowOf('');

    setShadowOf(SHADOW.NAV_SEARCH);
    return setOutline(true);
  };

  const handleEnterKey: FnType = (e) => {
    if (activeSuggest < 0) submitSearch();
    else setInput(getPlainText(suggests?.[activeSuggest]?.name.slice(0, 50)));
    e.stopPropagation();
    setActiveSuggest(-1);
  };

  return { handleInput, handleEnterKey };
}

export function useKeyInput(setInput: SetStateType<string>, submitSearch: FnType) {
  const { suggests, activeSuggest, setActiveSuggest, setSuggestBox } = useOutline();
  const { handleInput, handleEnterKey } = useInput(setInput, submitSearch);
  const { setShadowOf } = useShadow();

  const handleKeyInput: FnType = (e: EventType) => {
    if (!e.target.value) return;
    setSuggestBox(true);

    switch (e.key) {
      case 'ArrowDown':
        return suggests.length && setActiveSuggest(Math.min(activeSuggest + 1, LAST_SUGGEST, suggests.length - 1));

      case 'ArrowUp':
        return suggests.length && setActiveSuggest(Math.max(activeSuggest - 1, 0));

      case 'Enter':
        return handleEnterKey(e);

      case 'Escape':
        setSuggestBox(false);
        setActiveSuggest(-1);
        return setShadowOf('');
    }
    handleInput(e.target.value);
  };

  return { handleKeyInput };
}
