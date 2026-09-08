import { createReducers } from '../../slice/ReduxToolKitClient';

describe('createReducers', () => {
  test('_REQUEST sets loading to true', () => {
    const reducers = createReducers('user');
    expect((reducers._REQUEST as never as () => unknown)()).toEqual({ loading: true });
  });

  test('_SUCCESS nests the payload under the given state key by default', () => {
    const reducers = createReducers('user');
    const result = (reducers._SUCCESS as never as (s: unknown, a: unknown) => unknown)(
      {},
      { payload: { name: 'Ada' } }
    );
    expect(result).toEqual({ user: { name: 'Ada' }, loading: false, success: true });
  });

  // NOTE: '...' is a sentinel meaning "the payload IS the whole state" — used when a slice
  // has no single wrapping key (e.g. a list endpoint returning {products, page, pages} as-is).
  test('_SUCCESS spreads the payload directly when stateKeyName is the "..." sentinel', () => {
    const reducers = createReducers('...');
    const result = (reducers._SUCCESS as never as (s: unknown, a: unknown) => unknown)(
      {},
      { payload: { products: [1, 2], pages: 3 } }
    );
    expect(result).toEqual({ products: [1, 2], pages: 3, loading: false, success: true });
  });

  test('_FAIL sets loading to false and stores the error', () => {
    const reducers = createReducers('user');
    const result = (reducers._FAIL as never as (s: unknown, a: unknown) => unknown)({}, { payload: 'boom' });
    expect(result).toEqual({ loading: false, error: 'boom' });
  });

  test('_RESET clears the state back to empty', () => {
    const reducers = createReducers('user');
    expect((reducers._RESET as never as () => unknown)()).toEqual({});
  });

  test('overwriteReducers can add or override reducers', () => {
    const custom = jest.fn(() => ({ custom: true }));
    const reducers = createReducers('user', { _CUSTOM: custom } as never);
    expect(reducers).toHaveProperty('_CUSTOM', custom);
  });
});
