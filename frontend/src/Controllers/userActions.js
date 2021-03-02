import Axios from "axios";
import {
  userRegisterActions,
  userSigninActions,
  userDetailsActions,
  userUpdateProfileActions,
  userUpdateActions,
  userListActions,
  userDeleteActions,
  userTopSellerListActions,
} from "../Features/User/UserSlice";

export const register = (name, email, password) => async (dispatch) => {
  dispatch(userRegisterActions._REQUEST({ email, password }));
  try {
    const { data } = await Axios.post("/api/users/register", {
      name,
      email,
      password,
    });
    dispatch(userRegisterActions._SUCCESS(data));
    dispatch(userSigninActions._SUCCESS(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch(
      userRegisterActions._FAIL(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const signin = (email, password) => async (dispatch) => {
  dispatch(userSigninActions._REQUEST({ email, password }));
  try {
    const { data } = await Axios.post("/api/users/signin", { email, password });
    dispatch(userSigninActions._SUCCESS(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch(
      userSigninActions._FAIL(
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
  dispatch(userSigninActions._SIGNOUT());
  document.location.href = "/signin";
};

export const detailsUser = (userId) => async (dispatch, getState) => {
  dispatch(userDetailsActions._REQUEST(userId));
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    });
    dispatch(userDetailsActions._SUCCESS(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userDetailsActions._FAIL(message));
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  dispatch(userUpdateProfileActions._REQUEST(user));
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/users/profile`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch(userUpdateProfileActions._SUCCESS(data));
    dispatch(userSigninActions._SUCCESS(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userUpdateProfileActions._FAIL(message));
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  dispatch(userUpdateProfileActions._REQUEST(user));
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/users/${user._id}`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch(userUpdateActions._SUCCESS(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userUpdateActions._FAIL(message));
  }
};

export const listUsers = () => async (dispatch, getState) => {
  dispatch(userListActions._REQUEST());
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get("/api/users", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch(userListActions._SUCCESS(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userListActions._FAIL(message));
  }
};

export const deleteUser = (userId) => async (dispatch, getState) => {
  dispatch(userDeleteActions._REQUEST(userId));
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.delete(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch(userDeleteActions._SUCCESS(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userDeleteActions._FAIL(message));
  }
};

export const listTopSellers = () => async (dispatch) => {
  dispatch(userTopSellerListActions._REQUEST());
  try {
    const { data } = await Axios.get("/api/users/top-sellers");
    dispatch(userTopSellerListActions._SUCCESS(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userTopSellerListActions._FAIL(message));
  }
};
