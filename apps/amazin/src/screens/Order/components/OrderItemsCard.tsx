import InfoCard from './InfoCard';
import OrderItem from './OrderItem';

export default function OrderItemsCard({ items }: { items: ItemType[] }) {
  return (
    <InfoCard label="Order Items">
      <ul>
        {items?.map((item) => (
          <OrderItem key={item.product as string} item={item} />
        ))}
      </ul>
    </InfoCard>
  );
}
