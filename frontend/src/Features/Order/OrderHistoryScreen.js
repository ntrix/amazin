import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { listOrderMine } from "../../Controllers/orderActions";

import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { CURRENCY, DD_MM_YYYY } from "../../constants";

export default function OrderHistoryScreen(props) {
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);

  return (
    <div>
      <h1 className="p-1">Order History</h1>
      {loading ? (
        <LoadingBox xl />
      ) : (
        <>
          <MessageBox variant="danger" msg={error} />

          {orders && (
            <table className="table">
              <thead>
                <tr>
                  <th>USER_ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th className="tab__w6">ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
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
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}
