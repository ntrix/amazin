import { useRef, useCallback } from 'react';

export function useDebounce(fn, duration = 500) {
  const id = useRef(null);

  const debounceFn = useCallback(
    (...args) => {
      clearTimeout(id.current);
      id.current = setTimeout(() => {
        id.current = null;
        return fn.apply(this, args);
      }, duration);
    },
    [fn, duration]
  );

  const clearDebounceFn = useCallback(
    (...args) => {
      clearTimeout(id.current);
      id.current = null;
      return args ? fn.apply(this, args) : null;
    },
    [fn]
  );

  return [debounceFn, clearDebounceFn];
}
