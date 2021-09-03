import { Link } from 'react-router-dom';
import MessageBox from 'src/components/MessageBox';
import CartRowItem from './CartRowItem';

export default function CartTable({ cart: { cartItems, error }, ...props }) {
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
            {cartItems.map((item, id) => (
              <CartRowItem key={id} item={item} {...props} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
