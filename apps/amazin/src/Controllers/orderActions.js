import { axiosPrivate } from '../utils/axiosClient';
import { cartActions } from '../Features/Checkout/CartSlice.js';
import {
  orderCreateActions,
  orderDetailsActions,
  orderPayActions,
  orderMineListActions,
  orderListActions,
  orderDeleteActions,
  orderDeliverActions
} from '../Features/Order/OrderSlice';
import { KEY } from '../constants';
import { Storage } from '../utils';

export const createOrder = (order) =>
  axiosPrivate(order)(orderCreateActions)(
    cartActions._EMPTY,
    () => (Storage[KEY.CART_ITEMS] = ''),
    (_data) => _data.order
  )('post', '/api/orders', order);

export const detailsOrder = (orderId) =>
  axiosPrivate(orderId)(orderDetailsActions)()('get', `/api/orders/${orderId}`);

export const payOrder = (order, paymentResult) =>
  axiosPrivate({ order, paymentResult })(orderPayActions)()(
    'put',
    `/api/orders/${order._id}/pay`,
    paymentResult
  );

export const listOrderMine = () =>
  axiosPrivate()(orderMineListActions)()('get', '/api/orders/mine');

export const listOrders = ({ seller = '' }) =>
  axiosPrivate()(orderListActions)()('get', `/api/orders?seller=${seller}`);

export const deleteOrder = (orderId) =>
  axiosPrivate(orderId)(orderDeleteActions)()(
    'delete',
    `/api/orders/${orderId}`
  );

export const deliverOrder = (orderId) =>
  axiosPrivate(orderId)(orderDeliverActions)()(
    'put',
    `/api/orders/${orderId}/deliver`,
    {}
  );
