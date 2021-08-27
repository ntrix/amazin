import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { orderDeleteActions } from '../Order/OrderSlice';
import { deleteOrder, listOrders } from '../../apis/orderAPI';

import { CURR_FORMAT, DD_MM_YYYY } from '../../constants';
import LoadingOrError from '../../components/LoadingOrError';
import Button from '../../components/Button';

export default function OrderListScreen({ match }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userSignin);
  const sellerMode = match.path.indexOf('/seller') >= 0;
  const orderList = useSelector((state) => state.orderList);
  const orderDelete = useSelector((state) => state.orderDelete);

  useEffect(() => {
    dispatch(orderDeleteActions._RESET());
    dispatch(listOrders({ seller: sellerMode ? userInfo._id : '' }));
  }, [dispatch, sellerMode, orderDelete.success, userInfo._id]);

  const deleteHandler = (order) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteOrder(order._id));
    }
  };

  return (
    <div>
      <h1 className="p-1">Orders</h1>

      <LoadingOrError xl statusOf={orderList} />
      <LoadingOrError xl statusOf={orderDelete} />

      <table className="table">
        <thead>
          <tr>
            <th>USER_ID</th>
            <th>USER</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th className="tab__w12">ACTIONS</th>
          </tr>
        </thead>

        <tbody>
          {orderList?.orders?.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>

              <td>{order.user.name}</td>

              <td>{order.createdAt.substring(0, DD_MM_YYYY)}</td>

              <td>{order.totalPrice.toFixed(CURR_FORMAT)}</td>

              <td>
                {order.isPaid ? order.paidAt.substring(0, DD_MM_YYYY) : 'No'}
              </td>

              <td>
                {order.isDelivered
                  ? order.deliveredAt.substring(0, DD_MM_YYYY)
                  : 'No'}
              </td>

              <td>
                <Button
                  xs
                  className="danger"
                  label="Del."
                  onClick={() => deleteHandler(order)}
                />

                <Button xs label="Info" to={`/order/${order._id}`} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
