import { useSelector } from 'react-redux';

import { useOutline } from '../../useOutline';
import { useShadow } from 'src/hooks/useShadow';
import { findSuggest } from 'src/utils';
import { SHADOW } from 'src/constants';

export function useKeyInput(setInput, setSuggests, submitSearch) {
  const { productList } = useSelector((state) => state.productListAll);
  const { setOutline, setSuggestBox } = useOutline();
  const { shadowOf, setShadowOf } = useShadow();

  const handleKeyInput = ({ target: { value }, key }) => {
    if ('Enter' === key) return submitSearch();

    if ('Escape' === key || value.length === 0) {
      setSuggestBox(false);
      return setShadowOf('');
    }

    const newSuggests = findSuggest(productList, value);
    setSuggests(newSuggests);
    setSuggestBox(true);
    setInput(value);
    if (SHADOW.NAV_SEARCH === shadowOf || !newSuggests.length) return null;

    setShadowOf(SHADOW.NAV_SEARCH);
    return setOutline(true);
  };

  return { handleKeyInput };
}
