import React from 'react';
import { render } from '@testing-library/react';
import usePortal from '../../hooks/usePortal';

type Captured = { root?: Element };

function Harness({ id, captured }: { id: string; captured: Captured }) {
  captured.root = usePortal(id);
  return null;
}

describe('usePortal', () => {
  test('creates a container with the given id under document.body and appends its root element to it', () => {
    const captured: Captured = {};
    render(<Harness id="portal-a" captured={captured} />);

    const container = document.querySelector('#portal-a');
    expect(container).not.toBeNull();
    expect(container?.contains(captured.root as Node)).toBe(true);
  });

  test('reuses an existing container with the same id instead of creating a second one', () => {
    const first: Captured = {};
    const { unmount: unmountFirst } = render(<Harness id="portal-b" captured={first} />);

    const second: Captured = {};
    render(<Harness id="portal-b" captured={second} />);

    expect(document.querySelectorAll('#portal-b')).toHaveLength(1);
    unmountFirst();
  });

  test('removes the container on unmount once it has no children left', () => {
    const captured: Captured = {};
    const { unmount } = render(<Harness id="portal-c" captured={captured} />);

    expect(document.querySelector('#portal-c')).not.toBeNull();
    unmount();
    expect(document.querySelector('#portal-c')).toBeNull();
  });

  test('keeps the container when another consumer is still using it', () => {
    const first: Captured = {};
    const { unmount: unmountFirst } = render(<Harness id="portal-d" captured={first} />);
    const second: Captured = {};
    const { unmount: unmountSecond } = render(<Harness id="portal-d" captured={second} />);

    unmountFirst();
    expect(document.querySelector('#portal-d')).not.toBeNull();

    unmountSecond();
    expect(document.querySelector('#portal-d')).toBeNull();
  });
});
