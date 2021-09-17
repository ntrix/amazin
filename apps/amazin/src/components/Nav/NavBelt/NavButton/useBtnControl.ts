import { SHADOW } from 'src/constants';
import { useShadow } from 'src/hooks/useShadow';

export function useBtnControl() {
  const { setShadowOf, setShadowSlow } = useShadow();

  const onHover = (e: EventType) => {
    // simulate focus as onClick
    (document.activeElement as HTMLElement).blur();
    e.target.focus();
    setShadowSlow(SHADOW.NAV_DD);
  };
  // UX behavior: a touch on mobile device acts as hover action on Desktop
  const handleClick = () => {
    setShadowOf(SHADOW.NAV_DD);
  };

  const onBlur = () => {
    if (document.body !== document.activeElement) (document.activeElement as HTMLElement).blur();
    setShadowSlow('');
  };
  //TODO accessibility: isFocus & isEnterKeyPressed = onClick
  return { onHover, handleClick, onBlur };
}
