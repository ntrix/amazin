import { useSelector } from 'react-redux';

import { useOutline } from '../../useOutline';
import { useShadow } from 'src/hooks/useShadow';
import { findSuggest } from 'src/utils';
import { SHADOW } from 'src/constants';

export function useSuggestBox(setSuggests) {
  const { productList } = useSelector((state) => state.productListAll);

  const { setOutline, setScopeOutline, setSuggestBox } = useOutline();
  const { setShadowOf } = useShadow();

  const showBox = (input) => {
    setScopeOutline(0);
    if (!input) return;

    const newSuggests = findSuggest(productList, input);
    if (!newSuggests.length) return;

    setSuggests(newSuggests);
    setShadowOf(SHADOW.NAV_SEARCH);
    setSuggestBox(true);
  };

  const hideBoxOnCallback = () => () => {
    setOutline(false); // Wait to execute any click on Suggest Box, closes on callback
    setSuggestBox(false);
  };

  return { showBox, hideBoxOnCallback };
}
