import { CURR_FORMAT, DD_MM_YYYY } from 'src/constants';
import Button from 'src/components/Button';
import BaseTable from 'src/layouts/BaseTable';

export default function OrderTable({ orderList, deleteHandler }: { orderList: OrderListType; deleteHandler?: FnType }) {
  const header = ['ORDER_ID', 'DATE', 'TOTAL', 'PAID', 'DELIVERED'];
  if (deleteHandler) header.splice(1, 0, 'USER');

  return (
    <BaseTable
      header={header}
      body={orderList.orders?.map((order) => (
        <tr key={order._id}>
          <td>{order._id}</td>
          {deleteHandler && <td>{order.user.name}</td>}
          <td>{order.createdAt.substring(0, DD_MM_YYYY)}</td>
          <td>{order.totalPrice.toFixed(CURR_FORMAT)}</td>
          <td>{order.isPaid ? order.paidAt?.substring(0, DD_MM_YYYY) : 'No'}</td>
          <td>{order.isDelivered ? order.deliveredAt?.substring(0, DD_MM_YYYY) : 'No'}</td>
          <td>
            {deleteHandler && <Button xs className="danger" label="Del." onClick={() => deleteHandler(order)} />}
            <Button xs label="Info" to={`/order/${order._id}`} />
          </td>
        </tr>
      ))}
    />
  );
}
