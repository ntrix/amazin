import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { productCreateActions } from '../../ProductSlice';
import { createProduct } from '../../../../Controllers/productActions';

export function _ButtonSell() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { userInfo } = useSelector((state) => state.userSignin);
  const productCreate = useSelector((state) => state.productCreate);

  useEffect(() => {
    if (productCreate.success) {
      dispatch(productCreateActions._RESET());
      history.push(`/product/${productCreate.product._id}/edit`);
    }
  }, [productCreate, dispatch, history]);

  const createSellingProduct = () => {
    dispatch(createProduct());
  };

  return (
    <button
      className="banner__button mh-2"
      disabled={!userInfo?.isSeller}
      onClick={createSellingProduct}
    >
      Sell This Movie
    </button>
  );
}

const ButtonSell = React.memo(_ButtonSell);
export default ButtonSell;
