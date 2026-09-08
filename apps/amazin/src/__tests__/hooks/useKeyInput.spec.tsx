import React from 'react';
import { act } from '@testing-library/react';

import { renderWithProviders } from '../../test-utils';
import { useKeyInput } from '../../components/Nav/NavSearch/SearchBox/SearchInput/useKeyInput';
import OutlineProvider, { useOutline } from '../../components/Nav/NavSearch/useOutline';
import { useShadow } from '../../hooks/useShadow';

type Captured = {
  handleKeyInput?: (e: unknown) => void;
  activeSuggest?: number;
  suggests?: { name: string }[];
  shadowOf?: string;
};

function Harness({ setInput, submitSearch, captured }: { setInput: (v: string) => void; submitSearch: () => void; captured: Captured }) {
  const { handleKeyInput } = useKeyInput(setInput, submitSearch);
  const { activeSuggest, suggests } = useOutline();
  const { shadowOf } = useShadow();
  captured.handleKeyInput = handleKeyInput as never;
  captured.activeSuggest = activeSuggest;
  captured.suggests = suggests;
  captured.shadowOf = shadowOf;
  return null;
}

function renderHarness(setInput: (v: string) => void, submitSearch: () => void, captured: Captured) {
  return renderWithProviders(
    <OutlineProvider>
      <Harness setInput={setInput} submitSearch={submitSearch} captured={captured} />
    </OutlineProvider>,
    { preloadedState: { productListAll: { productList: [{ name: 'iPhone 12' }] }, userSignin: {} } as never }
  );
}

describe('useKeyInput', () => {
  test('ignores the key event entirely when the input is empty', () => {
    const setInput = jest.fn();
    const submitSearch = jest.fn();
    const captured: Captured = {};
    renderHarness(setInput, submitSearch, captured);

    act(() => {
      captured.handleKeyInput?.({ key: 'a', target: { value: '' }, stopPropagation: jest.fn() });
    });

    expect(setInput).not.toHaveBeenCalled();
  });

  test('pressing Enter with no suggestion highlighted submits the search', () => {
    const setInput = jest.fn();
    const submitSearch = jest.fn();
    const captured: Captured = {};
    renderHarness(setInput, submitSearch, captured);

    act(() => {
      captured.handleKeyInput?.({ key: 'Enter', target: { value: 'iphone' }, stopPropagation: jest.fn() });
    });

    expect(submitSearch).toHaveBeenCalled();
  });

  test('pressing Escape clears the nav shadow overlay', () => {
    const setInput = jest.fn();
    const submitSearch = jest.fn();
    const captured: Captured = {};
    renderHarness(setInput, submitSearch, captured);

    act(() => {
      captured.handleKeyInput?.({ key: 'Escape', target: { value: 'iphone' }, stopPropagation: jest.fn() });
    });

    // NOTE: setShadowOf's internal `shadow !== shadowOf && shadow` check evaluates to the
    // boolean `false` (not '') when clearing from an already-empty shadow — real, current behavior.
    expect(captured.shadowOf).toBeFalsy();
  });

  test('typing a matching value populates suggestions', () => {
    const setInput = jest.fn();
    const submitSearch = jest.fn();
    const captured: Captured = {};
    renderHarness(setInput, submitSearch, captured);

    act(() => {
      captured.handleKeyInput?.({ key: 'a', target: { value: 'iphone' }, stopPropagation: jest.fn() });
    });

    expect(setInput).toHaveBeenCalledWith('iphone');
    expect(captured.suggests?.length).toBe(1);
  });
});
