import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { createProduct, deleteProduct, listProducts } from 'src/apis/productAPI';
import { useShadow } from 'src/hooks/useShadow';
import { productCreateActions, productDeleteActions } from 'src/slice/ProductSlice';

export function useProductList({ history, match }: RouteProps<MatchParams>) {
  const dispatch = useDispatch();
  const { pageNumber = '1' } = useParams();
  const { userInfo } = useShadow();
  const productCreate: ProductDetailType = useSelector((state: AppState) => state.productCreate);
  const productDelete: StatusType = useSelector((state: AppState) => state.productDelete);
  // eslint-disable-next-line

  useEffect(() => {
    if (productCreate.success) {
      dispatch(productCreateActions._RESET(''));
      history.push(`/product/${productCreate.product._id}/edit`);
    }
    if (productDelete.success) dispatch(productDeleteActions._RESET(''));

    // (do not dispatch updated list, only use createHandler in VideoScreen ButtonSell )
    if (!match?.path) return;
    // only find results match seller id or all results for admin
    const seller = match?.path?.indexOf('/seller') < 0 ? '' : userInfo._id;

    // min = 0 to find all products no matter what price it is (0.00) to edit
    dispatch(listProducts({ pageNumber, seller, min: '0' }));
  }, [productCreate, productDelete.success, history, match?.path, userInfo, pageNumber, dispatch]);

  const deleteHandler = (product: ProductType) =>
    window.confirm('Are you sure to delete?') && dispatch(deleteProduct(product._id));

  const createHandler = () => dispatch(createProduct());

  // make authenticated url for pagination
  const authUrl = ({ page: _page }: { page: number }) =>
    `/product-list${userInfo.isAdmin ? '' : '/seller'}/pageNumber/${_page}`;

  return { userInfo, authUrl, productCreate, productDelete, deleteHandler, createHandler };
}
