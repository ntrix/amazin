import Axios from "axios";
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_CATEGORY_LIST_SUCCESS,
  PRODUCT_CATEGORY_LIST_REQUEST,
  PRODUCT_CATEGORY_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_REVIEW_CREATE_REQUEST,
  PRODUCT_REVIEW_CREATE_SUCCESS,
  PRODUCT_REVIEW_CREATE_FAIL,
} from "../../Features/Product/ProductSlice";

export const listProducts = ({
  pageNumber = "",
  seller = "",
  name = "",
  category = "",
  order = "",
  min = 0,
  max = 0,
  rating = 0,
}) => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      `/api/products?pageNumber=${pageNumber}&seller=${seller}&name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}`
    );
    dispatch(PRODUCT_LIST_SUCCESS(data));
  } catch (error) {
    dispatch(PRODUCT_LIST_FAIL(error.message));
  }
};

export const listProductCategories = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_CATEGORY_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/products/categories`);
    dispatch(PRODUCT_CATEGORY_LIST_SUCCESS(data));
  } catch (error) {
    dispatch(PRODUCT_CATEGORY_LIST_FAIL(error.message));
  }
};

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch(PRODUCT_DETAILS_REQUEST(productId));
  try {
    const { data } = await Axios.get(`/api/products/${productId}`);
    dispatch(PRODUCT_DETAILS_SUCCESS(data));
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const createProduct = () => async (dispatch, getState) => {
  dispatch(PRODUCT_CREATE_REQUEST());
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      "/api/products",
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(PRODUCT_CREATE_FAIL(message));
  }
};
export const updateProduct = (product) => async (dispatch, getState) => {
  dispatch(PRODUCT_UPDATE_REQUEST(product));
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/products/${product._id}`, product, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch(PRODUCT_UPDATE_SUCCESS(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(PRODUCT_UPDATE_FAIL(message));
  }
};
export const deleteProduct = (productId) => async (dispatch, getState) => {
  dispatch(PRODUCT_DELETE_REQUEST(productId));
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.delete(`/api/products/${productId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch(PRODUCT_DELETE_SUCCESS());
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(PRODUCT_DELETE_FAIL(message));
  }
};
export const createReview = (productId, review) => async (
  dispatch,
  getState
) => {
  dispatch(PRODUCT_REVIEW_CREATE_REQUEST());
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      `/api/products/${productId}/reviews`,
      review,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: PRODUCT_REVIEW_CREATE_SUCCESS,
      payload: data.review,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(PRODUCT_REVIEW_CREATE_FAIL(message));
  }
};
