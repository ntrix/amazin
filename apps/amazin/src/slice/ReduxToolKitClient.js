export { createSlice } from '@reduxjs/toolkit';
export const createReducers = (stateKeyName, overwriteReducers) => ({
  _REQUEST: () => ({ loading: true }),
  _SUCCESS: (state, action) => {
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
  _FAIL: (state, action) => ({
    loading: false,
    error: action.payload
  }),
  _RESET: () => ({}),
  ...overwriteReducers
});

export const adapter = (name, initialState, reducers) => ({ name, initialState, reducers });
