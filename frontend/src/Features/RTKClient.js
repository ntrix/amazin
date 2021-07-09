export { createSlice } from "@reduxjs/toolkit";

export const Reducer = (stateKeyName) => ({
  _REQUEST: (state, action) => ({ loading: true }),
  _SUCCESS: (state, action) => {
    if (typeof action.payload === "string" && action.payload.startsWith("<!"))
      // Error HTML response?
      return {
        loading: false,
        error: "Couldn't access Database Server!",
        success: false,
      };
    return stateKeyName === "..." // noname saved state? Array? => destructuring
      ? {
          ...action.payload, // e.g. { a:1, b:2, c:3, loading, success }
          loading: false,
          success: true,
        }
      : {
          [stateKeyName]: action.payload, // e.g. { state[a]:1, loading, success }
          loading: false,
          success: true,
        };
  },
  _FAIL: (state, action) => ({
    loading: false,
    error: action.payload,
  }),
  _RESET: (state, action) => ({}),
});
