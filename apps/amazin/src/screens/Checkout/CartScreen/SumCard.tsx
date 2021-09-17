import { pipe } from 'src/utils';
import Button from 'src/components/Button';

export default function SumCard({ cart: { cartItems }, to }: CartDetailType & { to: string }) {
  const count = cartItems.reduce((a, c) => a + c.qty, 0);
  const total = pipe.showPrice(cartItems.reduce((a, c) => a + c.price * c.qty, 0));

  return (
    <div className="card card__body">
      <h2 children={`Subtotal (${count} items) : ${total}`} />
      <Button primary fill disabled={!cartItems.length} to={to} label="Proceed to Buy" />
    </div>
  );
}
