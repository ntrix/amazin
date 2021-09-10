import { SHADOW } from 'src/constants';
import { useShadow } from 'src/hooks/useShadow';

export function useBtnControl() {
  const { setShadowOf, setShadowSlow } = useShadow();

  const onHover = (e) => {
    if (e.target !== document.activeElement) document.activeElement.blur();
    // simulate focus as onClick
    e.target.focus();
    setShadowSlow(SHADOW.NAV_DD);
  };
  // UX behavior: a touch on mobile device acts as hover action on Desktop
  const handleClick = () => {
    setShadowOf(SHADOW.NAV_DD);
  };

  const onBlur = () => {
    if (document.body !== document.activeElement) document.activeElement.blur();
    setShadowSlow('');
  };
  //TODO accessibility: isFocus & isEnterKeyPressed = onClick
  return { onHover, handleClick, onBlur };
}
