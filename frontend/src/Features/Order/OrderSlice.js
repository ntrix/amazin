import { createSlice, Reducer } from "../RTKClient";

export const {
  actions: orderCreateActions,
  reducer: orderCreateReducer,
} = createSlice({
  name: "orderCreate",
  initialState: {},
  reducers: Reducer("order"),
});

export const {
  actions: orderDetailsActions,
  reducer: orderDetailsReducer,
} = createSlice({
  name: "orderDetails",
  initialState: { loading: true },
  reducers: Reducer("order"),
});

export const {
  actions: orderPayActions,
  reducer: orderPayReducer,
} = createSlice({
  name: "orderPay",
  initialState: {},
  reducers: Reducer(),
});

export const {
  actions: orderMineListActions,
  reducer: orderMineListReducer,
} = createSlice({
  name: "orderMineList",
  initialState: { orders: [] },
  reducers: Reducer("orders"),
});

export const {
  actions: orderListActions,
  reducer: orderListReducer,
} = createSlice({
  name: "orderList",
  initialState: { orders: [] },
  reducers: Reducer("orders"),
});

export const {
  actions: orderDeleteActions,
  reducer: orderDeleteReducer,
} = createSlice({
  name: "orderDelete",
  initialState: {},
  reducers: Reducer(),
});

export const {
  actions: orderDeliverActions,
  reducer: orderDeliverReducer,
} = createSlice({
  name: "orderDeliver",
  initialState: {},
  reducers: Reducer(),
});
