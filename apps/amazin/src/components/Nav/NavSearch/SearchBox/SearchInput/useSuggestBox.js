import { useSelector } from 'react-redux';
import { useOutline } from '../../useOutline';
import { useShadow } from 'src/hooks/useShadow';
import { SHADOW } from 'src/constants';
import { findSuggest } from 'src/utils';
export function useSuggestBox(setSuggests) {
  const { productList } = useSelector((state) => state.productListAll);
  const { suggestBox, setOutline, setScopeOutline, setSuggestBox } = useOutline();
  const { setShadowOf } = useShadow();
  const showSuggestBox = (input) => {
    setScopeOutline(0);
    if (!input) return;
    const newSuggests = findSuggest.search(productList, input);
    if (!newSuggests.length) return;
    setSuggests(newSuggests);
    setShadowOf(SHADOW.NAV_SEARCH);
    setSuggestBox(true);
  };
  const hideSuggestBoxOnCallback = () => {
    setOutline(false); // Wait to execute any click on Suggest Box, closes on callback
    return suggestBox ? () => setSuggestBox(false) : null;
  };
  return [showSuggestBox, hideSuggestBoxOnCallback];
}
