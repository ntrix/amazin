import { createSlice } from "@reduxjs/toolkit";

export const {
  actions: orderCreateActions,
  reducer: orderCreateReducer,
} = createSlice({
  name: "orderCreate",
  initialState: {},
  reducers: {
    _REQUEST: (state, action) => ({ loading: true }),
    _SUCCESS: (state, action) => ({
      loading: false,
      success: true,
      order: action.payload,
    }),
    _FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
    _RESET: (state, action) => ({}),
  },
});

export const {
  actions: orderDetailsActions,
  reducer: orderDetailsReducer,
} = createSlice({
  name: "orderDetails",
  initialState: { loading: true },
  reducers: {
    _REQUEST: (state, action) => ({ loading: true }),
    _SUCCESS: (state, action) => ({
      loading: false,
      order: action.payload,
    }),
    _FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
  },
});

export const {
  actions: orderPayActions,
  reducer: orderPayReducer,
} = createSlice({
  name: "orderPay",
  initialState: {},
  reducers: {
    _REQUEST: (state, action) => ({ loading: true }),
    _SUCCESS: (state, action) => ({ loading: false, success: true }),
    _FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
    _RESET: (state, action) => ({}),
  },
});

export const {
  actions: orderMineListActions,
  reducer: orderMineListReducer,
} = createSlice({
  name: "orderMineList",
  initialState: { orders: [] },
  reducers: {
    _REQUEST: (state, action) => ({ loading: true }),
    _SUCCESS: (state, action) => ({
      loading: false,
      orders: action.payload,
    }),
    _FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
  },
});

export const {
  actions: orderListActions,
  reducer: orderListReducer,
} = createSlice({
  name: "orderList",
  initialState: { orders: [] },
  reducers: {
    _REQUEST: (state, action) => ({ loading: true }),
    _SUCCESS: (state, action) => ({
      loading: false,
      orders: action.payload,
    }),
    _FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
  },
});

export const {
  actions: orderDeleteActions,
  reducer: orderDeleteReducer,
} = createSlice({
  name: "orderDelete",
  initialState: {},
  reducers: {
    _REQUEST: (state, action) => ({ loading: true }),
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
  actions: orderDeliverActions,
  reducer: orderDeliverReducer,
} = createSlice({
  name: "orderDeliver",
  initialState: {},
  reducers: {
    _REQUEST: (state, action) => ({ loading: true }),
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
