// NOTE: useDdoThenDebounce (typo in the real export name) is not imported anywhere else in
// the codebase — it appears to be unused/dead code. Tested here anyway since it has real,
// slightly tricky "leading-edge then trailing debounce" logic worth locking in if it's
// ever wired up.
import React from 'react';
import { render, act } from '@testing-library/react';
import { useDdoThenDebounce } from '../../hooks/useDoThenDebounce';

type Captured = { call?: (...args: unknown[]) => void };

function Harness({ fn, captured }: { fn: (...args: unknown[]) => number; captured: Captured }) {
  captured.call = useDdoThenDebounce(fn, 500);
  return null;
}

describe('useDdoThenDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('calls fn immediately on the very first call (leading edge)', () => {
    const fn = jest.fn(() => 123);
    const captured: Captured = {};
    render(<Harness fn={fn} captured={captured} />);

    act(() => {
      captured.call?.('a');
    });

    expect(fn).toHaveBeenCalledWith('a');
  });

  test('debounces subsequent calls to the trailing edge', () => {
    const fn = jest.fn(() => 123);
    const captured: Captured = {};
    render(<Harness fn={fn} captured={captured} />);

    act(() => {
      captured.call?.('first');
      captured.call?.('second');
      captured.call?.('third');
    });
    expect(fn).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith('third');
  });
});
