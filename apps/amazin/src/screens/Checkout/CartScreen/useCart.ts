import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addToCart, removeFromCart } from 'src/apis/cartAPI';

export function useCart({ match, location: { search } }: RouteProps<MatchParams>) {
  const dispatch = useDispatch();
  const productId = match.params.id;
  const qty = search ? Number(search.split('=')[1]) : 1;
  const cart = useSelector((state: { cart: CartType }) => state.cart);

  useEffect(() => {
    if (productId) dispatch(addToCart(productId, qty));
  }, [dispatch, productId, qty]);

  const addHandler = (productId: string, qty: number) => dispatch(addToCart(productId, qty));

  const removeHandler = (id: string) => dispatch(removeFromCart(id));

  return { cart, addHandler, removeHandler };
}
