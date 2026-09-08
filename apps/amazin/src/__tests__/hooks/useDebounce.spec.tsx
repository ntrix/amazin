import React from 'react';
import { render, act } from '@testing-library/react';
import { useDebounce } from '../../hooks/useDebounce';

type Captured = {
  debounce?: (...args: unknown[]) => void;
  clear?: (...args: unknown[]) => void;
};

function Harness({ fn, captured }: { fn: (...args: unknown[]) => void; captured: Captured }) {
  const [debounce, clear] = useDebounce(fn);
  captured.debounce = debounce;
  captured.clear = clear;
  return null;
}

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('does not call fn before the debounce duration elapses', () => {
    const fn = jest.fn();
    const captured: Captured = {};
    render(<Harness fn={fn} captured={captured} />);

    act(() => {
      captured.debounce?.('a');
    });
    jest.advanceTimersByTime(499);

    expect(fn).not.toHaveBeenCalled();
  });

  test('collapses rapid calls into a single call with the latest arguments', () => {
    const fn = jest.fn();
    const captured: Captured = {};
    render(<Harness fn={fn} captured={captured} />);

    act(() => {
      captured.debounce?.('first');
      captured.debounce?.('second');
      jest.advanceTimersByTime(500);
    });

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('second');
  });

  test('clear cancels the pending call and invokes fn immediately with its own arguments', () => {
    const fn = jest.fn();
    const captured: Captured = {};
    render(<Harness fn={fn} captured={captured} />);

    act(() => {
      captured.debounce?.('pending');
      captured.clear?.('immediate');
    });
    jest.advanceTimersByTime(500);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('immediate');
  });
});
