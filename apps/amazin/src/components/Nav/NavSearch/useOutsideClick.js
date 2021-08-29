import { useCallback, useEffect, useRef } from 'react';
import { useOutline } from '../../../hooks/useOutline';
import { useShadow } from '../../../hooks/useShadow';
import { SHADOW } from '../../../constants';

export function useOutsideClick() {
  const { shadowOf, setShadowOf } = useShadow();
  const { setScopeOutline, setSuggestBox } = useOutline();
  const SearchBoxRef = useRef(null);
  const handleOutsideClick = useCallback(
    (e) => {
      if (!SearchBoxRef.current.contains(e.target)) {
        setSuggestBox(false);
        setScopeOutline(0);
        setShadowOf('');
      }
      return e;
    },
    [SearchBoxRef, setSuggestBox, setScopeOutline, setShadowOf]
  );
  /* detect click outside component to close categories search scope window */
  useEffect(() => {
    if (SHADOW.SCOPE === shadowOf) document.addEventListener('mousedown', handleOutsideClick);
    if (SHADOW.NAV_DD === shadowOf) {
      document.removeEventListener('mousedown', handleOutsideClick);
      setScopeOutline(0);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [setScopeOutline, shadowOf, handleOutsideClick]);
  return SearchBoxRef;
}
