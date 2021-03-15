export { createSlice } from "@reduxjs/toolkit";

export const Reducer = (payload) => ({
  _REQUEST: (state, action) => ({ loading: true }),
  _SUCCESS: (state, action) =>
    payload == "..."
      ? {
          ...action.payload,
          loading: false,
        }
      : {
          [payload]: action.payload,
          loading: false,
          success: true,
        },
  _FAIL: (state, action) => ({
    loading: false,
    error: action.payload,
  }),
  _RESET: (state, action) => ({}),
});
