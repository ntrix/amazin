import { useRef } from 'react';

export function useDdoThenDebounce(fn: FnType, duration = 500, _id = 0) {
  const id = useRef(_id);
  const { current: _fn } = useRef(fn);
  const { current: f } = useRef(_f);

  function _f(...args: unknown[]) {
    if (!id.current) {
      id.current = _fn(...args) as number;
      return;
    }
    clearTimeout(id.current);
    id.current = window.setTimeout(() => {
      id.current = 0;
      return _fn(...args);
    }, duration);
  }
  return f;
}
