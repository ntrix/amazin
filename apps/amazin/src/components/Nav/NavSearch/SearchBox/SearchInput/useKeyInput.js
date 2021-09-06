import { useSelector } from 'react-redux';

import { useOutline } from '../../useOutline';
import { useShadow } from 'src/hooks/useShadow';
import { findSuggest } from 'src/utils';
import { SHADOW } from 'src/constants';

export function useKeyInput(setInput, setSuggests, submitSearch) {
  const { productList } = useSelector((state) => state.productListAll);
  const { setOutline, setSuggestBox } = useOutline();
  const { setShadowOf } = useShadow();

  const handleKeyInput = ({ target: { value }, key }) => {
    switch (key) {
      case 'Enter':
        return submitSearch();

      case 'Escape':
        setSuggestBox(false);
        return setShadowOf('');

      default:
        if (!value.length) return setShadowOf('');
    }
    const newSuggests = findSuggest(productList, value);
    setSuggests(newSuggests);
    setSuggestBox(true);
    setInput(value);
    if (!newSuggests.length) return null;

    setShadowOf(SHADOW.NAV_SEARCH);
    return setOutline(true);
  };

  return { handleKeyInput };
}
