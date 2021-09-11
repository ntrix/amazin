import { adapter, createSlice, createReducers } from './ReduxToolKitClient';

export const { actions: orderCreateActions, reducer: orderCreateReducer } = createSlice(
  adapter('orderCreate', {}, createReducers('order'))
);

export const { actions: orderDetailsActions, reducer: orderDetailsReducer } = createSlice(
  adapter('orderDetails', { loading: true }, createReducers('order'))
);

export const { actions: orderPayActions, reducer: orderPayReducer } = createSlice(
  adapter('orderPay', {}, createReducers())
);

export const { actions: orderMineListActions, reducer: orderMineListReducer } = createSlice(
  adapter('orderMineList', { orders: [] }, createReducers('orders'))
);

export const { actions: orderListActions, reducer: orderListReducer } = createSlice(
  adapter('orderList', { orders: [] }, createReducers('orders'))
);

export const { actions: orderDeleteActions, reducer: orderDeleteReducer } = createSlice(
  adapter('orderDelete', {}, createReducers())
);

export const { actions: orderDeliverActions, reducer: orderDeliverReducer } = createSlice(
  adapter('orderDeliver', {}, createReducers())
);
