import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { createProduct, deleteProduct, listProducts } from 'src/apis/productAPI';
import { productCreateActions, productDeleteActions } from 'src/slice/ProductSlice';
import Pagination from 'src/components/Pagination';
import Button from 'src/components/Button';
import LoadingOrError from 'src/components/LoadingOrError';
import BaseTable from 'src/layouts/BaseTable';

export default function ProductListScreen(props) {
  const dispatch = useDispatch();
  const { pageNumber = 1 } = useParams();
  const sellerMode = props.match.path.indexOf('/seller') >= 0;
  const { userInfo } = useSelector((state) => state.userSignin);
  const productList = useSelector((state) => state.productList);
  const { products, page, pages } = productList;
  const productCreate = useSelector((state) => state.productCreate);
  const productDelete = useSelector((state) => state.productDelete);

  useEffect(() => {
    if (productCreate.success) {
      dispatch(productCreateActions._RESET());
      props.history.push(`/product/${productCreate.product._id}/edit`);
    }
    if (productDelete.success) {
      dispatch(productDeleteActions._RESET());
    }
    // min = 0 to find all products no matter what price it is (0.00) to edit
    dispatch(
      listProducts({
        pageNumber,
        seller: sellerMode ? userInfo._id : '',
        min: '0'
      })
    );
  }, [
    dispatch,
    props.history,
    sellerMode,
    productDelete.success,
    productCreate.success,
    productCreate.product,
    userInfo._id,
    pageNumber
  ]);

  const deleteHandler = (product) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteProduct(product._id));
    }
  };

  const createHandler = () => {
    dispatch(createProduct());
  };

  return (
    <div>
      <div className="row p-1">
        <h1>Products</h1>
        <Button primary label="Create Product" onClick={createHandler} />
      </div>

      <LoadingOrError xl statusOf={productDelete} />
      <LoadingOrError xl statusOf={productCreate} />
      <LoadingOrError xl statusOf={productList} />

      {!!products && (
        <>
          <BaseTable
            header={['USER_ID', 'NAME', 'PRICE', 'CATEGORY', 'BRAND']}
            body={products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <Button xs className="danger" label="Del." onClick={() => deleteHandler(product)} />
                  <Button xs label="Edit" to={`/product/${product._id}/edit`} />
                </td>
              </tr>
            ))}
          />

          <Pagination
            getUrl={({ page: _page }) => `/product-list${userInfo.isAdmin ? '' : '/seller'}/pageNumber/${_page}`}
            page={page}
            pages={pages}
            help
          />
        </>
      )}
    </div>
  );
}
