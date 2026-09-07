import React from 'react';
import { render, act, screen } from '@testing-library/react';
import { useSafeState } from '../../hooks/useSafeState';

type Captured = {
  safeSetState?: (next: number) => void;
  mountedRef?: React.MutableRefObject<boolean>;
};

function Harness({ captured }: { captured: Captured }) {
  const [count, safeSetState, mountedRef] = useSafeState(0);
  captured.safeSetState = safeSetState;
  captured.mountedRef = mountedRef;
  return <div data-testid="count">{count}</div>;
}

describe('useSafeState', () => {
  test('updates state normally while the component is mounted', () => {
    const captured: Captured = {};
    render(<Harness captured={captured} />);

    act(() => {
      captured.safeSetState?.(5);
    });

    expect(screen.getByTestId('count').textContent).toBe('5');
  });

  test('mountedRef reflects the component lifecycle', () => {
    const captured: Captured = {};
    const { unmount } = render(<Harness captured={captured} />);

    expect(captured.mountedRef?.current).toBe(true);

    unmount();

    expect(captured.mountedRef?.current).toBe(false);
  });

  test('does nothing and does not warn when called after unmount', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const captured: Captured = {};
    const { unmount } = render(<Harness captured={captured} />);
    const safeSetStateAfterUnmount = captured.safeSetState;

    unmount();

    expect(() => {
      act(() => {
        safeSetStateAfterUnmount?.(99);
      });
    }).not.toThrow();

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
  });
});
