import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { orderDeleteActions } from "../Order/OrderSlice";
import { deleteOrder, listOrders } from "../../Controllers/orderActions";

import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { CURRENCY, DD_MM_YYYY } from "../../constants";

export default function OrderListScreen(props) {
  const sellerMode = props.match.path.indexOf("/seller") >= 0;
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderDeleteActions._RESET());
    dispatch(listOrders({ seller: sellerMode ? userInfo._id : "" }));
  }, [dispatch, sellerMode, successDelete, userInfo._id]);
  const deleteHandler = (order) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteOrder(order._id));
    }
  };
  return (
    <div>
      <h1 className="p-1">Orders</h1>
      <LoadingBox xl hide={!loadingDelete} />
      <MessageBox variant="danger" msg={errorDelete} />
      {loading ? (
        <LoadingBox xl />
      ) : (
        <>
          <MessageBox variant="danger" msg={error} />
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
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user.name}</td>
                  <td>{order.createdAt.substring(0, DD_MM_YYYY)}</td>
                  <td>{order.totalPrice.toFixed(CURRENCY)}</td>
                  <td>
                    {order.isPaid
                      ? order.paidAt.substring(0, DD_MM_YYYY)
                      : "No"}
                  </td>
                  <td>
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, DD_MM_YYYY)
                      : "No"}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() => {
                        props.history.push(`/order/${order._id}`);
                      }}
                    >
                      Info
                    </button>
                    <button
                      type="button"
                      className="small danger"
                      onClick={() => deleteHandler(order)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
