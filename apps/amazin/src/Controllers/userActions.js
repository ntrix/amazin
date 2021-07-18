import { axiosPublic, axiosPrivate } from './axiosClient';
import {
  userRegisterActions,
  userSigninActions,
  userDetailsActions,
  userUpdateProfileActions,
  userUpdateActions,
  userListActions,
  userDeleteActions,
  userTopSellerListActions
} from '../Features/User/UserSlice';
import {
  STORAGE_CART_ITEMS,
  STORAGE_SHIPPING_ADDRESS,
  STORAGE_USERINFO
} from '../constants';

export const register = (name, email, password, confirmPassword) =>
  axiosPublic({ email, password })(userRegisterActions)(
    userSigninActions._SUCCESS,
    (_data) => localStorage.setItem(STORAGE_USERINFO, JSON.stringify(_data))
  )('post', '/api/users/register', {
    name,
    email,
    password,
    confirmPassword
  });

export const signin = (email, password) =>
  axiosPublic({ email, password })(userSigninActions)(null, (_data) =>
    localStorage.setItem(STORAGE_USERINFO, JSON.stringify(_data))
  )('post', '/api/users/signin', {
    email,
    password
  });

export const signout = () => (dispatch) => {
  localStorage.removeItem(STORAGE_USERINFO);
  localStorage.removeItem(STORAGE_CART_ITEMS);
  localStorage.removeItem(STORAGE_SHIPPING_ADDRESS);
  dispatch(userSigninActions._RESET());
  document.location.href = '/signin';
};

export const detailsUser = (userId) =>
  axiosPrivate(userId)(userDetailsActions)()('get', `/api/users/${userId}`);

export const updateUserProfile = (user) =>
  axiosPrivate(user)(userUpdateProfileActions)(
    userSigninActions._SUCCESS,
    (_data) => localStorage.setItem(STORAGE_USERINFO, JSON.stringify(_data))
  )('put', `/api/users/profile`, user);

export const updateUser = (user) =>
  axiosPrivate(user)(userUpdateProfileActions, userUpdateActions)()(
    'put',
    `/api/users/${user._id}`,
    user
  );

export const listUsers = () =>
  axiosPrivate()(userListActions)()('get', '/api/users');

export const deleteUser = (userId) =>
  axiosPrivate(userId)(userDeleteActions)()('delete', `/api/users/${userId}`);

export const listTopSellers = () =>
  axiosPublic()(userTopSellerListActions)()('get', '/api/users/top-sellers');
