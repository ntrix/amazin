export { createSlice } from "@reduxjs/toolkit";

export const Reducer = (stateKeyName) => ({
  _REQUEST: (state, action) => ({ loading: true }),
  _SUCCESS: (state, action) =>
    stateKeyName === "..." //noname saved state => destructuring
      ? {
          ...action.payload,
          loading: false,
          success: true,
        }
      : {
          [stateKeyName]: action.payload,
          loading: false,
          success: true,
        },
  _FAIL: (state, action) => ({
    loading: false,
    error: action.payload,
  }),
  _RESET: (state, action) => ({}),
});
