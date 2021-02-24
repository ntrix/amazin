import { createSlice } from "@reduxjs/toolkit";

const orderCreateSlice = createSlice({
  name: "orderCreate",
  initialState: {},
  reducers: {
    ORDER_CREATE_REQUEST: (state, action) => ({ loading: true }),
    ORDER_CREATE_SUCCESS: (state, action) => ({
      loading: false,
      success: true,
      order: action.payload,
    }),
    ORDER_CREATE_FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
    ORDER_CREATE_RESET: (state, action) => ({}),
  },
});

const {
  actions: orderCreateActions,
  reducer: orderCreateReducer,
} = orderCreateSlice;
export const {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_RESET,
} = orderCreateActions;
export { orderCreateReducer };

const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState: { loading: true },
  reducers: {
    ORDER_DETAILS_REQUEST: (state, action) => ({ loading: true }),
    ORDER_DETAILS_SUCCESS: (state, action) => ({
      loading: false,
      order: action.payload,
    }),
    ORDER_DETAILS_FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
  },
});

const {
  actions: orderDetailsActions,
  reducer: orderDetailsReducer,
} = orderDetailsSlice;
export const {
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
} = orderDetailsActions;
export { orderDetailsReducer };

const orderPaySlice = createSlice({
  name: "orderPay",
  initialState: {},
  reducers: {
    ORDER_PAY_REQUEST: (state, action) => ({ loading: true }),
    ORDER_PAY_SUCCESS: (state, action) => ({ loading: false, success: true }),
    ORDER_PAY_FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
    ORDER_PAY_RESET: (state, action) => ({}),
  },
});

const { actions: orderPayActions, reducer: orderPayReducer } = orderPaySlice;
export const {
  ORDER_PAY_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_RESET,
} = orderPayActions;
export { orderPayReducer };

const orderMineListSlice = createSlice({
  name: "orderMineList",
  initialState: { orders: [] },
  reducers: {
    ORDER_MINE_LIST_REQUEST: (state, action) => ({ loading: true }),
    ORDER_MINE_LIST_SUCCESS: (state, action) => ({
      loading: false,
      orders: action.payload,
    }),
    ORDER_MINE_LIST_FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
  },
});

const {
  actions: orderMineListActions,
  reducer: orderMineListReducer,
} = orderMineListSlice;
export const {
  ORDER_MINE_LIST_REQUEST,
  ORDER_MINE_LIST_FAIL,
  ORDER_MINE_LIST_SUCCESS,
} = orderMineListActions;
export { orderMineListReducer };

const orderListSlice = createSlice({
  name: "orderList",
  initialState: { orders: [] },
  reducers: {
    ORDER_LIST_REQUEST: (state, action) => ({ loading: true }),
    ORDER_LIST_SUCCESS: (state, action) => ({
      loading: false,
      orders: action.payload,
    }),
    ORDER_LIST_FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
  },
});

const { actions: orderListActions, reducer: orderListReducer } = orderListSlice;
export const {
  ORDER_LIST_REQUEST,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
} = orderListActions;
export { orderListReducer };

const orderDeleteSlice = createSlice({
  name: "orderDelete",
  initialState: {},
  reducers: {
    ORDER_DELETE_REQUEST: (state, action) => ({ loading: true }),
    ORDER_DELETE_SUCCESS: (state, action) => ({
      loading: false,
      success: true,
    }),
    ORDER_DELETE_FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
    ORDER_DELETE_RESET: (state, action) => ({}),
  },
});

const {
  actions: orderDeleteActions,
  reducer: orderDeleteReducer,
} = orderDeleteSlice;
export const {
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_RESET,
} = orderDeleteActions;
export { orderDeleteReducer };

const orderDeliverSlice = createSlice({
  name: "orderDeliver",
  initialState: {},
  reducers: {
    ORDER_DELIVER_REQUEST: (state, action) => ({ loading: true }),
    ORDER_DELIVER_SUCCESS: (state, action) => ({
      loading: false,
      success: true,
    }),
    ORDER_DELIVER_FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
    ORDER_DELIVER_RESET: (state, action) => ({}),
  },
});

const {
  actions: orderDeliverActions,
  reducer: orderDeliverReducer,
} = orderDeliverSlice;
export const {
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_RESET,
} = orderDeliverActions;
export { orderDeliverReducer };
