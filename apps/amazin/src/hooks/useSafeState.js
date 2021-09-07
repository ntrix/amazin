import { useCallback, useLayoutEffect, useRef, useState } from 'react';

export function useMounted() {
  const mountedRef = useRef(false);

  useLayoutEffect(() => {
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
      if (mountedRef.current) setState(newState);
    },
    [mountedRef]
  );

  return [state, safeSetState, mountedRef, setState];
}
