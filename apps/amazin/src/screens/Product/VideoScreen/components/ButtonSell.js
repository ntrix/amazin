import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createProduct } from 'src/apis/productAPI';
import { productCreateActions } from 'src/slice/ProductSlice';

export const SellerButton = (props) => (
  <button className="banner__button mh-2" {...props}>
    Sell This Movie
  </button>
);

function ButtonSell() {
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

  return <SellerButton disabled={!userInfo?.isSeller} onClick={createSellingProduct} />;
}

export default memo(ButtonSell);
