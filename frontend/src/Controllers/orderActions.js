import axiosClient from "./axiosClient";
import { cartActions } from "../Features/Checkout/CartSlice.js";
import {
  orderCreateActions,
  orderDetailsActions,
  orderPayActions,
  orderMineListActions,
  orderListActions,
  orderDeleteActions,
  orderDeliverActions,
} from "../Features/Order/OrderSlice";

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch(orderCreateActions._REQUEST(order));
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axiosClient.post("/api/orders", order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch(orderCreateActions._SUCCESS(data.order));
    dispatch(cartActions._EMPTY());
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch(
      orderCreateActions._FAIL(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch(orderDetailsActions._REQUEST(orderId));
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axiosClient.get(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch(orderDetailsActions._SUCCESS(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(orderDetailsActions._FAIL(message));
  }
};

export const payOrder = (order, paymentResult) => async (
  dispatch,
  getState
) => {
  dispatch(orderPayActions._REQUEST({ order, paymentResult }));
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = axiosClient.put(
      `/api/orders/${order._id}/pay`,
      paymentResult,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch(orderPayActions._SUCCESS(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(orderPayActions._FAIL(message));
  }
};

export const listOrderMine = () => async (dispatch, getState) => {
  dispatch(orderMineListActions._REQUEST());
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axiosClient.get("/api/orders/mine", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch(orderMineListActions._SUCCESS(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(orderMineListActions._FAIL(message));
  }
};

export const listOrders = ({ seller = "" }) => async (dispatch, getState) => {
  dispatch(orderListActions._REQUEST());
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axiosClient.get(`/api/orders?seller=${seller}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch(orderListActions._SUCCESS(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(orderListActions._FAIL(message));
  }
};

export const deleteOrder = (orderId) => async (dispatch, getState) => {
  dispatch(orderDeleteActions._REQUEST(orderId));
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = axiosClient.delete(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch(orderDeleteActions._SUCCESS(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(orderDeleteActions._FAIL(message));
  }
};

export const deliverOrder = (orderId) => async (dispatch, getState) => {
  dispatch(orderDeliverActions._REQUEST(orderId));
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = axiosClient.put(
      `/api/orders/${orderId}/deliver`,
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch(orderDeliverActions._SUCCESS(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(orderDeliverActions._FAIL(message));
  }
};
