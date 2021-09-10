import { axiosPrivate } from './axiosClient';
import { cartActions } from '../slice/CartSlice';
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
    successAction: cartActions._EMPTY,
    successHandler: () => (Storage[KEY.CART_ITEMS] = ''),
    selector: (_data) => _data.order
  })('post', '/api/orders', order);

export const detailsOrder = (orderId) => axiosPrivate([orderDetailsActions])('get', `/api/orders/${orderId}`);

export const payOrder = (order, paymentResult) =>
  axiosPrivate([orderPayActions])('put', `/api/orders/${order._id}/pay`, paymentResult);

export const listOrderMine = () => axiosPrivate([orderMineListActions])('get', '/api/orders/mine');

export const listOrders = ({ seller = '' }) => axiosPrivate([orderListActions])('get', `/api/orders?seller=${seller}`);

export const deleteOrder = (orderId) => axiosPrivate([orderDeleteActions])('delete', `/api/orders/${orderId}`);

export const deliverOrder = (orderId) =>
  axiosPrivate([orderDeliverActions])('put', `/api/orders/${orderId}/deliver`, {});
