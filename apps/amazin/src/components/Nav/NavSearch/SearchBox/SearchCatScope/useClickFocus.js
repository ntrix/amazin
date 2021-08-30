import { useOutline } from '../../useOutline';
import { useShadow } from 'src/hooks/useShadow';
import { SHADOW } from 'src/constants';

export function useClickOrFocus() {
  const { setOutline, scopeOutline, setScopeOutline, setSuggestBox } = useOutline();
  const { setShadowOf } = useShadow();
  const onClickOrFocus = () => {
    setOutline(false);
    setScopeOutline(scopeOutline ? 1 - scopeOutline : -1);
    setSuggestBox(false);
    setShadowOf(SHADOW.SCOPE);
  };
  return { onClickOrFocus };
}
