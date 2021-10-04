import { useOutline } from '../../useOutline';
import { useShadow } from 'src/hooks/useShadow';
import { findSuggest } from 'src/utils';
import { Scope, SHADOW } from 'src/constants';

export function useSuggestBox(setSuggests: SetStateType<{ name: string }[]>) {
  const { productList, setOutline, setScopeOutline, setSuggestBox } = useOutline();
  const { setShadowOf } = useShadow();

  const showBox = (input?: string) => {
    setScopeOutline(Scope.hide);
    if (!input) return;

    const newSuggests = findSuggest(productList, input);
    if (!newSuggests.length) return;

    setSuggests(newSuggests);
    setShadowOf(SHADOW.NAV_SEARCH);
    setSuggestBox(true);
  };

  const hideBoxOnCallback = () => {
    setOutline(false);
    // Wait to execute any click on Suggest Box, then closes/hides suggest box on callback
    return () => setSuggestBox(false);
  };

  return { showBox, hideBoxOnCallback };
}
