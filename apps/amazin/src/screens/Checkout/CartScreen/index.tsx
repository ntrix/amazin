import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addToCart, removeFromCart } from 'src/apis/cartAPI';
import Header from 'src/layouts/Header';
import CartTable from './CartTable';
import SumCard from './SumCard';

export default function CartScreen({ match, location: { search } }: RouteProps<MatchParams>) {
  const dispatch = useDispatch();
  const productId = match.params.id;
  const qty = search ? Number(search.split('=')[1]) : 1;
  const cart = useSelector((state: AppState) => state.cart);

  useEffect(() => {
    if (productId) dispatch(addToCart(productId, qty));
  }, [dispatch, productId, qty]);

  const addHandler = (productId: string, qty: number) => dispatch(addToCart(productId, qty));

  const removeHandler = (id: string) => dispatch(removeFromCart(id));

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
