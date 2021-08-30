import OrderItem from './OrderItem';

export default function OrderItemsCard({ items }) {
  return (
    <li className="card card__body">
      <div className="p-1">
        <h2>Order Items</h2>
        <ul>
          {items?.map((item, id) => (
            <OrderItem key={id} item={item} />
          ))}
        </ul>
      </div>
    </li>
  );
}
