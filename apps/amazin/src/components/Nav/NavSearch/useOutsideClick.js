import { useCallback, useEffect, useRef } from 'react';
import { useOutline } from './useOutline';
import { useShadow } from 'src/hooks/useShadow';
import { SHADOW } from 'src/constants';
export function useOutsideClick() {
  const { shadowOf, setShadowOf } = useShadow();
  const { setScopeOutline, setSuggestBox } = useOutline();
  const NavSearchRef = useRef(null);
  const handleOutsideClick = useCallback((e) => {
    if (!NavSearchRef.current || NavSearchRef.current.contains(e.target)) return;
    setSuggestBox(false);
    setScopeOutline(0);
    setShadowOf(''); // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (SHADOW.SCOPE === shadowOf) document.addEventListener('mousedown', handleOutsideClick);
    if (SHADOW.NAV_DD === shadowOf) {
      document.removeEventListener('mousedown', handleOutsideClick);
      setScopeOutline(0);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [setScopeOutline, shadowOf, handleOutsideClick]);
  return { NavSearchRef };
}
