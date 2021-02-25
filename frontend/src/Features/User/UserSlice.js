import { createSlice } from "@reduxjs/toolkit";

const userRegisterSlice = createSlice({
  name: "userRegister",
  initialState: {},
  reducers: {
    USER_REGISTER_REQUEST: (state, action) => ({
      loading: true,
    }),
    USER_REGISTER_SUCCESS: (state, action) => ({
      loading: false,
      userInfo: action.payload,
    }),
    USER_REGISTER_FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
  },
});

const {
  actions: userRegisterActions,
  reducer: userRegisterReducer,
} = userRegisterSlice;
export const {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} = userRegisterActions;
export { userRegisterReducer };

const userSigninSlice = createSlice({
  name: "userSignin",
  initialState: {},
  reducers: {
    USER_SIGNIN_REQUEST: (state, action) => ({
      loading: true,
    }),
    USER_SIGNIN_SUCCESS: (state, action) => ({
      loading: false,
      userInfo: action.payload,
    }),
    USER_SIGNIN_FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
    USER_SIGNOUT: (state, action) => ({}),
  },
});

const {
  actions: userSigninActions,
  reducer: userSigninReducer,
} = userSigninSlice;
export const {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
} = userSigninActions;
export { userSigninReducer };

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: { loading: true },
  reducers: {
    USER_DETAILS_REQUEST: (state, action) => ({
      loading: true,
    }),
    USER_DETAILS_SUCCESS: (state, action) => ({
      loading: false,
      user: action.payload,
    }),
    USER_DETAILS_FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
    USER_DETAILS_RESET: (state, action) => ({
      loading: true,
    }),
  },
});

const {
  actions: userDetailsActions,
  reducer: userDetailsReducer,
} = userDetailsSlice;
export const {
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
} = userDetailsActions;
export { userDetailsReducer };

const userUpdateProfileSlice = createSlice({
  name: "userUpdateProfile",
  initialState: {},
  reducers: {
    USER_UPDATE_PROFILE_REQUEST: (state, action) => ({
      loading: true,
    }),
    USER_UPDATE_PROFILE_SUCCESS: (state, action) => ({
      loading: false,
      success: true,
    }),
    USER_UPDATE_PROFILE_FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
    USER_UPDATE_PROFILE_RESET: (state, action) => ({}),
  },
});

const {
  actions: userUpdateProfileActions,
  reducer: userUpdateProfileReducer,
} = userUpdateProfileSlice;
export const {
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_RESET,
} = userUpdateProfileActions;
export { userUpdateProfileReducer };

const userUpdateSlice = createSlice({
  name: "userUpdate",
  initialState: {},
  reducers: {
    USER_UPDATE_REQUEST: (state, action) => ({
      loading: true,
    }),
    USER_UPDATE_SUCCESS: (state, action) => ({
      loading: false,
      success: true,
    }),
    USER_UPDATE_FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
    USER_UPDATE_RESET: (state, action) => ({}),
  },
});

const {
  actions: userUpdateActions,
  reducer: userUpdateReducer,
} = userUpdateSlice;
export const {
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
} = userUpdateActions;
export { userUpdateReducer };

const userListSlice = createSlice({
  name: "userList",
  initialState: { loading: true },
  reducers: {
    USER_LIST_REQUEST: (state, action) => ({
      loading: true,
    }),
    USER_LIST_SUCCESS: (state, action) => ({
      loading: false,
      users: action.payload,
    }),
    USER_LIST_FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
  },
});

const { actions: userListActions, reducer: userListReducer } = userListSlice;
export const {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
} = userListActions;
export { userListReducer };

const userDeleteSlice = createSlice({
  name: "userDelete",
  initialState: {},
  reducers: {
    USER_DELETE_REQUEST: (state, action) => ({
      loading: true,
    }),
    USER_DELETE_SUCCESS: (state, action) => ({
      loading: false,
      success: true,
    }),
    USER_DELETE_FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
    USER_DELETE_RESET: (state, action) => ({}),
  },
});

const {
  actions: userDeleteActions,
  reducer: userDeleteReducer,
} = userDeleteSlice;
export const {
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_RESET,
} = userDeleteActions;
export { userDeleteReducer };

const userTopSellerListSlice = createSlice({
  name: "userTopSellerList",
  initialState: { loading: true },
  reducers: {
    USER_TOPSELLERS_LIST_REQUEST: (state, action) => ({
      loading: true,
    }),
    USER_TOPSELLERS_LIST_SUCCESS: (state, action) => ({
      loading: false,
      users: action.payload,
    }),
    USER_TOPSELLERS_LIST_FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
  },
});

const {
  actions: userTopSellerListActions,
  reducer: userTopSellerListReducer,
} = userTopSellerListSlice;
export const {
  USER_TOPSELLERS_LIST_REQUEST,
  USER_TOPSELLERS_LIST_SUCCESS,
  USER_TOPSELLERS_LIST_FAIL,
} = userTopSellerListActions;
export { userTopSellerListReducer };

const userAddressMapSlice = createSlice({
  name: "userAddressMap",
  initialState: {},
  reducers: {
    USER_ADDRESS_MAP_CONFIRM: (state, action) => ({
      address: action.payload,
    }),
  },
});

const {
  actions: userAddressMapActions,
  reducer: userAddressMapReducer,
} = userAddressMapSlice;
export const { USER_ADDRESS_MAP_CONFIRM } = userAddressMapActions;
export { userAddressMapReducer };
