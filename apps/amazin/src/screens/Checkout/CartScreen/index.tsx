import { useCart } from './useCart';
import Header from 'src/layouts/Header';
import CartTable from 'src/components/Checkout/CartScreen/CartTable';
import SumCard from 'src/components/Checkout/CartScreen/SumCard';

export default function CartScreen(props: RouteProps<MatchParams>) {
  const { cart, addHandler, removeHandler } = useCart(props);

  return (
    <div className="screen--light row top">
      <div className="col-2">
        <Header p1 label="Shopping Cart" />
        <CartTable cart={cart} addHandler={addHandler} removeHandler={removeHandler} />
      </div>

      <div className="col-1">
        <SumCard cart={cart} to="/signin?redirect=shipping" />
      </div>
    </div>
  );
}
