import Axios from "axios";
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_TOPSELLERS_LIST_REQUEST,
  USER_TOPSELLERS_LIST_SUCCESS,
  USER_TOPSELLERS_LIST_FAIL,
} from "../Features/User/UserSlice";

export const register = (name, email, password) => async (dispatch) => {
  dispatch(USER_REGISTER_REQUEST({ email, password }));
  try {
    const { data } = await Axios.post("/api/users/register", {
      name,
      email,
      password,
    });
    dispatch(USER_REGISTER_SUCCESS(data));
    dispatch(USER_SIGNIN_SUCCESS(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch(
      USER_REGISTER_FAIL(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const signin = (email, password) => async (dispatch) => {
  dispatch(USER_SIGNIN_REQUEST({ email, password }));
  try {
    const { data } = await Axios.post("/api/users/signin", { email, password });
    dispatch(USER_SIGNIN_SUCCESS(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch(
      USER_SIGNIN_FAIL(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  dispatch(USER_SIGNOUT());
  document.location.href = "/signin";
};
export const detailsUser = (userId) => async (dispatch, getState) => {
  dispatch(USER_DETAILS_REQUEST(userId));
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    });
    dispatch(USER_DETAILS_SUCCESS(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(USER_DETAILS_FAIL(message));
  }
};
export const updateUserProfile = (user) => async (dispatch, getState) => {
  dispatch(USER_UPDATE_PROFILE_REQUEST(user));
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/users/profile`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch(USER_UPDATE_PROFILE_SUCCESS(data));
    dispatch(USER_SIGNIN_SUCCESS(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(USER_UPDATE_PROFILE_FAIL(message));
  }
};
export const updateUser = (user) => async (dispatch, getState) => {
  dispatch(USER_UPDATE_PROFILE_REQUEST(user));
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/users/${user._id}`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch(USER_UPDATE_SUCCESS(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(USER_UPDATE_FAIL(message));
  }
};
export const listUsers = () => async (dispatch, getState) => {
  dispatch(USER_LIST_REQUEST());
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get("/api/users", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch(USER_LIST_SUCCESS(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(USER_LIST_FAIL(message));
  }
};
export const deleteUser = (userId) => async (dispatch, getState) => {
  dispatch(USER_DELETE_REQUEST(userId));
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.delete(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch(USER_DELETE_SUCCESS(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(USER_DELETE_FAIL(message));
  }
};
export const listTopSellers = () => async (dispatch) => {
  dispatch(USER_TOPSELLERS_LIST_REQUEST());
  try {
    const { data } = await Axios.get("/api/users/top-sellers");
    dispatch(USER_TOPSELLERS_LIST_SUCCESS(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(USER_TOPSELLERS_LIST_FAIL(message));
  }
};
