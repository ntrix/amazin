import { Link } from 'react-router-dom';
import MessageBox from 'src/components/MessageBox';
import CartRowItem, { CartRowItemProps } from './CartRowItem';

export type CartTableProps = CartRowItemProps & {
  cart: CartType;
};

export default function CartTable({ cart: { cartItems, error }, ...rest }: CartTableProps) {
  return (
    <>
      <MessageBox msg={error} variant="danger" />

      {cartItems.length < 1 ? (
        <MessageBox show>
          Your cart is still empty. <Link to="/" children={<b>Let's go back and shopping something first.</b>} />
        </MessageBox>
      ) : (
        <table className="table">
          <tbody>
            {cartItems.map((item) => (
              <CartRowItem key={item.product as string} {...rest} item={item} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
