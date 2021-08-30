import ListRow from '../components/ListRow';

export default function OrderSumCard({ order }) {
  return (
    <li className="card card__body">
      <ul className="min-20">
        <h2>Order Summary</h2>
        <ListRow label="Items" toShow={order.itemsPrice} />
        <ListRow label="Shipping" toShow={order.shippingPrice} />
        <ListRow label="Before 19% MwSt" toShow={order.taxPrice} />
        <ListRow label="Order Total" toShow={order.totalPrice} active />
      </ul>
    </li>
  );
}
