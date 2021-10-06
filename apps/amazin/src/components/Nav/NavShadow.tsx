import { Scope, SHADOW, SIDEBAR_CLOSE_BTN_ID } from 'src/constants';
import { useShadow } from 'src/hooks/useShadow';
import { useOutline } from './NavSearch/useOutline';

export default function NavShadow() {
  const { shadowOf, setShadowOf } = useShadow();
  const { setOutline, setScopeOutline, setSuggestBox } = useOutline();

  const isOpened = SHADOW.SIDEBAR === shadowOf;

  const hideAllEffect = (e: EventType) => {
    setSuggestBox(false);
    setScopeOutline(Scope.hide);
    setShadowOf('');
    setOutline(false);
  };

  return (
    <>
      <label
        htmlFor={SIDEBAR_CLOSE_BTN_ID}
        className={isOpened ? 'click-catcher' : ''}
        aria-label="close sidebar area"
      />
      <div className={`shadow-of__ ${shadowOf}`} role="presentation" onClick={hideAllEffect} />
    </>
  );
}
