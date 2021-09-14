import InfoCard from './InfoCard';
import OrderItem from './OrderItem';

export default function OrderItemsCard({ items }: { items: OrderItem[] }) {
  return (
    <InfoCard label="Order Items">
      <ul>
        {items?.map((item, id) => (
          <OrderItem key={id} item={item} />
        ))}
      </ul>
    </InfoCard>
  );
}
