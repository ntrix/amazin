import { SHADOW } from 'src/constants';
import { useShadow } from 'src/hooks/useShadow';

export function useBtnControl(focus) {
  const { setShadowOf, setShadowSlow } = useShadow();

  const onHover = (e) => {
    focus.current?.blur();
    // simulate focus as onClick
    focus.current = e.target;
    e.target.focus();
    setShadowSlow(SHADOW.NAV_DD);
  };
  // UX behavior: a touch on mobile device acts as hover action on Desktop
  const handleClick = (e) => {
    focus.current?.blur();
    document.activeElement.blur();
    focus.current = e.target;
    setShadowOf(SHADOW.NAV_DD);
  };
  //TODO accessibility: isFocus & isEnterKeyPressed = onClick
  return { onHover, handleClick, setShadowSlow };
}
