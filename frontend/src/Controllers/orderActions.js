import Axios from "axios";
import { CART_EMPTY } from "../Features/Checkout/CartSlice.js";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_MINE_LIST_REQUEST,
  ORDER_MINE_LIST_FAIL,
  ORDER_MINE_LIST_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
} from "../Features/Order/OrderSlice";

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch(ORDER_CREATE_REQUEST(order));
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post("/api/orders", order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch(ORDER_CREATE_SUCCESS(data.order));
    dispatch(CART_EMPTY());
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch(
      ORDER_CREATE_FAIL(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch(ORDER_DETAILS_REQUEST(orderId));
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch(ORDER_DETAILS_SUCCESS(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(ORDER_DETAILS_FAIL(message));
  }
};

export const payOrder = (order, paymentResult) => async (
  dispatch,
  getState
) => {
  dispatch(ORDER_PAY_REQUEST({ order, paymentResult }));
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.put(`/api/orders/${order._id}/pay`, paymentResult, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch(ORDER_PAY_SUCCESS(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(ORDER_PAY_FAIL(message));
  }
};
export const listOrderMine = () => async (dispatch, getState) => {
  dispatch(ORDER_MINE_LIST_REQUEST());
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get("/api/orders/mine", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch(ORDER_MINE_LIST_SUCCESS(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(ORDER_MINE_LIST_FAIL(message));
  }
};
export const listOrders = ({ seller = "" }) => async (dispatch, getState) => {
  dispatch(ORDER_LIST_REQUEST());
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/orders?seller=${seller}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch(ORDER_LIST_SUCCESS(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(ORDER_LIST_FAIL(message));
  }
};
export const deleteOrder = (orderId) => async (dispatch, getState) => {
  dispatch(ORDER_DELETE_REQUEST(orderId));
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.delete(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch(ORDER_DELETE_SUCCESS(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(ORDER_DELETE_FAIL(message));
  }
};

export const deliverOrder = (orderId) => async (dispatch, getState) => {
  dispatch(ORDER_DELIVER_REQUEST(orderId));
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.put(
      `/api/orders/${orderId}/deliver`,
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch(ORDER_DELIVER_SUCCESS(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(ORDER_DELIVER_FAIL(message));
  }
};
