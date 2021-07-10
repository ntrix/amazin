import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import Pagination from "../../components/Pagination";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../../Controllers/productActions";
import { productCreateActions, productDeleteActions } from "./ProductSlice";

export default function ProductListScreen(props) {
  const { pageNumber = 1 } = useParams();

  const sellerMode = props.match.path.indexOf("/seller") >= 0;
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch(productCreateActions._RESET());
      props.history.push(`/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch(productDeleteActions._RESET());
    }
    // min = 0 to find all products no matter what price it is (0.00) to edit
    dispatch(
      listProducts({
        pageNumber,
        seller: sellerMode ? userInfo._id : "",
        min: "0",
      })
    );
  }, [
    createdProduct,
    dispatch,
    props.history,
    sellerMode,
    successCreate,
    successDelete,
    userInfo._id,
    pageNumber,
  ]);

  const deleteHandler = (product) => {
    if (window.confirm("Are you sure to delete?")) {
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
        <button type="button" className="primary" onClick={createHandler}>
          Create Product
        </button>
      </div>

      <LoadingBox xl hide={!loadingDelete} />
      <LoadingBox xl hide={!loadingCreate} />
      <LoadingBox xl hide={!loading} />
      <MessageBox variant="danger" msg={errorDelete} />
      <MessageBox variant="danger" msg={errorCreate} />
      <MessageBox variant="danger" msg={error} />
      {!loading && !error && (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>USER_ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th className="tab__w12">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() =>
                        props.history.push(`/product/${product._id}/edit`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="small danger"
                      onClick={() => deleteHandler(product)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            page={page}
            pages={pages}
            getUrl={({ page: _page }) =>
              `/product-list${
                userInfo.isAdmin ? "" : "/seller"
              }/pageNumber/${_page}`
            }
            help
          />
        </>
      )}
    </div>
  );
}
