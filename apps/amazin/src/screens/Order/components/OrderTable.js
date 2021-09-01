import { CURR_FORMAT, DD_MM_YYYY } from 'src/constants';
import Button from 'src/components/Button';

export default function OrderTable({ orderList, deleteHandler }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>USER_ID</th>
          {deleteHandler && <th>USER</th>}
          <th>DATE</th>
          <th>TOTAL</th>
          <th>PAID</th>
          <th>DELIVERED</th>
          <th className="tab__w12">ACTIONS</th>
        </tr>
      </thead>

      <tbody>
        {orderList.orders?.map((order) => (
          <tr key={order._id}>
            <td>{order._id}</td>
            {deleteHandler && <td>{order.user.name}</td>}
            <td>{order.createdAt.substring(0, DD_MM_YYYY)}</td>
            <td>{order.totalPrice.toFixed(CURR_FORMAT)}</td>
            <td>{order.isPaid ? order.paidAt.substring(0, DD_MM_YYYY) : 'No'}</td>
            <td>{order.isDelivered ? order.deliveredAt.substring(0, DD_MM_YYYY) : 'No'}</td>
            <td>
              {deleteHandler && <Button xs className="danger" label="Del." onClick={() => deleteHandler(order)} />}
              <Button xs label="Info" to={`/order/${order._id}`} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
