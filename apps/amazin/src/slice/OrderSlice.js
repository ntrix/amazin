import { adapter, createSlice, Reducer } from './ReduxToolKitClient';

export const { actions: orderCreateActions, reducer: orderCreateReducer } = createSlice(
  adapter('orderCreate', {}, Reducer('order'))
);

export const { actions: orderDetailsActions, reducer: orderDetailsReducer } = createSlice(
  adapter('orderDetails', { loading: true }, Reducer('order'))
);

export const { actions: orderPayActions, reducer: orderPayReducer } = createSlice(adapter('orderPay', {}, Reducer()));

export const { actions: orderMineListActions, reducer: orderMineListReducer } = createSlice(
  adapter('orderMineList', { orders: [] }, Reducer('orders'))
);

export const { actions: orderListActions, reducer: orderListReducer } = createSlice(
  adapter('orderList', { orders: [] }, Reducer('orders'))
);

export const { actions: orderDeleteActions, reducer: orderDeleteReducer } = createSlice(
  adapter('orderDelete', {}, Reducer())
);

export const { actions: orderDeliverActions, reducer: orderDeliverReducer } = createSlice(
  adapter('orderDeliver', {}, Reducer())
);
