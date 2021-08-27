import { axiosPrivate } from './axiosClient';
import { cartActions } from '../slice/CartSlice.js';
import {
  orderCreateActions,
  orderDetailsActions,
  orderPayActions,
  orderMineListActions,
  orderListActions,
  orderDeleteActions,
  orderDeliverActions
} from '../slice/OrderSlice';
import { KEY } from '../constants';
import { Storage } from '../utils';

export const createOrder = (order) =>
  axiosPrivate([orderCreateActions], {
    req: order,
    extDispatch: cartActions._EMPTY,
    extHandler: () => (Storage[KEY.CART_ITEMS] = ''),
    selector: (_data) => _data.order
  })('post', '/api/orders', order);

export const detailsOrder = (orderId) =>
  axiosPrivate([orderDetailsActions], { req: orderId })(
    'get',
    `/api/orders/${orderId}`
  );

export const payOrder = (order, paymentResult) =>
  axiosPrivate([orderPayActions], { req: { order, paymentResult } })(
    'put',
    `/api/orders/${order._id}/pay`,
    paymentResult
  );

export const listOrderMine = () =>
  axiosPrivate([orderMineListActions])('get', '/api/orders/mine');

export const listOrders = ({ seller = '' }) =>
  axiosPrivate([orderListActions])('get', `/api/orders?seller=${seller}`);

export const deleteOrder = (orderId) =>
  axiosPrivate([orderDeleteActions], { req: orderId })(
    'delete',
    `/api/orders/${orderId}`
  );

export const deliverOrder = (orderId) =>
  axiosPrivate([orderDeliverActions], { req: orderId })(
    'put',
    `/api/orders/${orderId}/deliver`,
    {}
  );
