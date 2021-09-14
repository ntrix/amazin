import InfoCard from './InfoCard';
import OrderItem from './OrderItem';

export default function OrderItemsCard({ items }: { items: ItemType[] }) {
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
