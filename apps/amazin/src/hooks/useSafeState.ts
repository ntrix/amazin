import { useCallback, useLayoutEffect, useRef, useState } from 'react';

export function useMounted() {
  const mountedRef = useRef(false);

  useLayoutEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return mountedRef;
}

export function useSafeState<T>(init: T): [T, FnType, Ref<boolean>, SetState] {
  const mountedRef = useMounted();
  const [state, setState] = useState(init);

  const safeSetState: FnType = useCallback(
    (newState) => {
      if (mountedRef.current) setState(newState);
    },
    [mountedRef]
  );

  return [state, safeSetState, mountedRef, setState];
}
