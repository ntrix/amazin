import { useCallback, useLayoutEffect, useRef, useState } from 'react';

export function useMounted() {
  const mountedRef = useRef<boolean>(false);

  useLayoutEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return mountedRef;
}

export function useSafeState<T>(init: T): [T, FnType, React.MutableRefObject<boolean>, SetState] {
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
