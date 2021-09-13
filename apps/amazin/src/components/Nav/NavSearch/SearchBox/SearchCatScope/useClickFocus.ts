import { useOutline } from '../../useOutline';
import { useShadow } from 'src/hooks/useShadow';
import { SHADOW } from 'src/constants';

export function useClickOrFocus() {
  const { setShadowOf } = useShadow();
  const { setOutline, scopeOutline, setScopeOutline, setSuggestBox } = useOutline();

  const onClickOrFocus = () => {
    setOutline(false);
    setScopeOutline(scopeOutline ? 1 - scopeOutline : -1);
    setSuggestBox(false);
    setShadowOf(SHADOW.SCOPE);
  };

  return { onClickOrFocus };
}
