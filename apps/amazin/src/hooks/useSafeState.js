import { useCallback, useEffect, useRef, useState } from 'react';

export function useMounted() {
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => (mountedRef.current = false);
  }, []);
  return mountedRef;
}

export function useSafeState(init) {
  const mountedRef = useMounted();
  const [state, setState] = useState(init);
  const safeSetState = useCallback(
    (newState) => {
      if (mountedRef.current && newState) setState(newState);
    },
    [mountedRef]
  );
  return [state, safeSetState, mountedRef, setState];
}
