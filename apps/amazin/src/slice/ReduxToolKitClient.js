export { createSlice } from '@reduxjs/toolkit';
export const Reducer = (stateKeyName) => ({
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
  _RESET: () => ({})
});

export const adapter = (name, initialState, reducers) => ({ name, initialState, reducers });
