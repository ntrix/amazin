import { SliceCaseReducers } from '@reduxjs/toolkit';

export { createSlice } from '@reduxjs/toolkit';

export const createReducers: FnType = (stateKeyName = '', overwriteReducers?: SliceCaseReducers<unknown>) =>
  ({
    _REQUEST: () => ({ loading: true }),
    _SUCCESS: (state: AppState, action: SliceAction) => {
      // noname saved state?
      return stateKeyName === '...'
        ? {
            ...action.payload, // Array? => destructuring e.g. { a:1, b:2, c:3, loading, success }
            loading: false,
            success: true
          }
        : {
            [stateKeyName]: action.payload, // e.g. { state[a]:1, loading, success }
            loading: false,
            success: true
          };
    },
    _FAIL: (state: AppState, action: SliceAction) => ({
      loading: false,
      error: action.payload
    }),
    _RESET: () => ({}),
    ...overwriteReducers
  } as SliceCaseReducers<unknown>);

export const adapter: FnType = (name: string, initialState: unknown, reducers: SliceCaseReducers<unknown>) => ({
  initialState,
  reducers,
  name
});
