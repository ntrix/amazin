export { createSlice } from '@reduxjs/toolkit';

export const Reducer = (stateKeyName) => ({
  _REQUEST: () => ({ loading: true }),

  _SUCCESS: (state, action) => {
    if (typeof action.payload === 'string' && action.payload.startsWith('<!'))
      // HTML response with Error?
      return {
        loading: false,
        error: "Couldn't access Database Server!",
        success: false
      };
    // noname saved state?
    return stateKeyName === '...'
      ? {
          // Array? => destructuring e.g. { a:1, b:2, c:3, loading, success }
          loading: false,
          ...action.payload,
          success: true
        }
      : {
          // e.g. { state[a]:1, loading, success }
          [stateKeyName]: action.payload,
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
