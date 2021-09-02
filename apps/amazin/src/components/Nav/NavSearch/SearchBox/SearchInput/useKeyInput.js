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
    if (value.length === 0 || key === 'Escape') {
      setSuggestBox(false);
      return setShadowOf('');
    }

    if (key === 'Enter') return submitSearch();

    setSuggestBox(true);
    const newSuggests = findSuggest(productList, value);

    if (SHADOW.NAV_SEARCH !== shadowOf && newSuggests.length) {
      setShadowOf(SHADOW.NAV_SEARCH);
      setOutline(true);
    }
    setSuggests(newSuggests);
    setInput(value);
    return null;
  };

  return { handleKeyInput };
}
