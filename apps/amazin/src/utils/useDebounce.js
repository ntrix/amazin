import { useRef } from 'react';

export function useDebounce(fn, duration) {
  const id = useRef(null);
  const { current: func } = useRef(fn);
  const { current: debounce } = useRef(_debounce);
  const { current: clearBounce } = useRef(_clear);
  function _debounce(...args) {
    clearTimeout(id.current);
    id.current = setTimeout(() => {
      id.current = null;
      return func.apply(this, args);
    }, duration);
  }
  function _clear(...args) {
    clearTimeout(id.current);
    id.current = null;
    return func.apply(this, args);
  }
  return { debounce, clearBounce };
}

export function useDdoThenDebounce(fn, duration) {
  const id = useRef(null);
  const { current: func } = useRef(fn);
  const { current: f } = useRef(_f);
  function _f(...args) {
    if (!id.current) {
      id.current = func.apply(this, args);
      return;
    }
    clearTimeout(id.current);
    id.current = setTimeout(() => {
      id.current = null;
      return func.apply(this, args);
    }, duration);
  }
  return f;
}
