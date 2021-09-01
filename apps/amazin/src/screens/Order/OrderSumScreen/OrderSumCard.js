import ListRow from '../components/ListRow';
import Button from 'src/components/Button';
import { TAX } from 'src/constants';

export default function OrderSumCard({ order, tax = TAX * 100, placeOrderHandler, children }) {
  return (
    <li className="card card__body">
      <ul className="min-20">
        <h2>Order Summary</h2>
        {(!order.cartItems || order.cartItems.length > 0) && (
          <>
            <ListRow label="Items" toShow={order.itemsPrice} />
            <ListRow label="Shipping" toShow={order.shippingPrice} />
            <ListRow label={`Before ${tax}% MwSt`} toShow={order.taxPrice} />
            <ListRow label="Order Total" toShow={order.totalPrice} active />
          </>
        )}
        {!!placeOrderHandler && (
          <Button
            primary
            fill
            label="Place Order"
            disabled={order.cartItems?.length === 0}
            onClick={placeOrderHandler}
          />
        )}
        {children}
      </ul>
    </li>
  );
}
