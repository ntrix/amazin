import { useRef, useCallback } from 'react';

export function useDebounce(fn: FnType, duration = 500) {
  const id = useRef(0);

  const debounceFn = useCallback(
    (...args) => {
      clearTimeout(id.current);
      id.current = window.setTimeout(() => {
        id.current = 0;
        return fn(...args);
      }, duration);
    },
    [fn, duration]
  );

  const clearDebounceFn = useCallback(
    (...args) => {
      clearTimeout(id.current);
      id.current = 0;
      return args && fn && fn(...args);
    },
    [fn]
  );

  return [debounceFn, clearDebounceFn];
}
