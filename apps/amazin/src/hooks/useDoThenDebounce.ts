import { useRef } from 'react';

export function useDdoThenDebounce(fn: FnType, duration = 500) {
  const id = useRef(0);
  const { current: func } = useRef(fn);
  const { current: f } = useRef(_f);

  function _f(...args) {
    if (!id.current) {
      id.current = func(...args);
      return;
    }
    clearTimeout(id.current);
    id.current = window.setTimeout(() => {
      id.current = 0;
      return func(...args);
    }, duration);
  }
  return f;
}
