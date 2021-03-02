import { createSlice } from "@reduxjs/toolkit";

export const {
  actions: userRegisterActions,
  reducer: userRegisterReducer,
} = createSlice({
  name: "userRegister",
  initialState: {},
  reducers: {
    _REQUEST: (state, action) => ({
      loading: true,
    }),
    _SUCCESS: (state, action) => ({
      loading: false,
      userInfo: action.payload,
    }),
    _FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
  },
});

export const {
  actions: userSigninActions,
  reducer: userSigninReducer,
} = createSlice({
  name: "userSignin",
  initialState: {},
  reducers: {
    _REQUEST: (state, action) => ({
      loading: true,
    }),
    _SUCCESS: (state, action) => ({
      loading: false,
      userInfo: action.payload,
    }),
    _FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
    _SIGNOUT: (state, action) => ({}),
  },
});

export const {
  actions: userDetailsActions,
  reducer: userDetailsReducer,
} = createSlice({
  name: "userDetails",
  initialState: { loading: true },
  reducers: {
    _REQUEST: (state, action) => ({
      loading: true,
    }),
    _SUCCESS: (state, action) => ({
      loading: false,
      user: action.payload,
    }),
    _FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
    _RESET: (state, action) => ({
      loading: true,
    }),
  },
});

export const {
  actions: userUpdateProfileActions,
  reducer: userUpdateProfileReducer,
} = createSlice({
  name: "userUpdateProfile",
  initialState: {},
  reducers: {
    _REQUEST: (state, action) => ({
      loading: true,
    }),
    _SUCCESS: (state, action) => ({
      loading: false,
      success: true,
    }),
    _FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
    _RESET: (state, action) => ({}),
  },
});

export const {
  actions: userUpdateActions,
  reducer: userUpdateReducer,
} = createSlice({
  name: "userUpdate",
  initialState: {},
  reducers: {
    _REQUEST: (state, action) => ({
      loading: true,
    }),
    _SUCCESS: (state, action) => ({
      loading: false,
      success: true,
    }),
    _FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
    _RESET: (state, action) => ({}),
  },
});

export const {
  actions: userListActions,
  reducer: userListReducer,
} = createSlice({
  name: "userList",
  initialState: { loading: true },
  reducers: {
    _REQUEST: (state, action) => ({
      loading: true,
    }),
    _SUCCESS: (state, action) => ({
      loading: false,
      users: action.payload,
    }),
    _FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
  },
});

export const {
  actions: userDeleteActions,
  reducer: userDeleteReducer,
} = createSlice({
  name: "userDelete",
  initialState: {},
  reducers: {
    _REQUEST: (state, action) => ({
      loading: true,
    }),
    _SUCCESS: (state, action) => ({
      loading: false,
      success: true,
    }),
    _FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
    _RESET: (state, action) => ({}),
  },
});

export const {
  actions: userTopSellerListActions,
  reducer: userTopSellerListReducer,
} = createSlice({
  name: "userTopSellerList",
  initialState: { loading: true },
  reducers: {
    _REQUEST: (state, action) => ({
      loading: true,
    }),
    _SUCCESS: (state, action) => ({
      loading: false,
      users: action.payload,
    }),
    _FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
  },
});

export const {
  actions: userAddressMapActions,
  reducer: userAddressMapReducer,
} = createSlice({
  name: "userAddressMap",
  initialState: {},
  reducers: {
    _CONFIRM: (state, action) => ({
      address: action.payload,
    }),
  },
});
