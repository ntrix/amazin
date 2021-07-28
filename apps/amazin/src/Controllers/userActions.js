import { axiosPublic, axiosPrivate } from '../utils/axiosClient';
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
import { Storage } from '../utils';
import { KEY } from '../constants';

export const register = (name, email, password, confirmPassword) =>
  axiosPublic([userRegisterActions], {
    req: { email, password },
    extDispatch: userSigninActions._SUCCESS,
    extHandler: (_data) => (Storage[KEY.USER_INFO] = _data)
  })('post', '/api/users/register', {
    name,
    email,
    password,
    confirmPassword
  });

export const signin = (email, password) =>
  axiosPublic([userSigninActions], {
    req: { email, password },
    extHandler: (_data) => (Storage[KEY.USER_INFO] = _data)
  })('post', '/api/users/signin', {
    email,
    password
  });

export const signout = () => (dispatch) => {
  Storage[KEY.USER_INFO] = '';
  Storage[KEY.CART_ITEMS] = '';
  Storage[KEY.SHIPPING_ADDRESS] = '';
  dispatch(userSigninActions._RESET());
  document.location.href = '/signin';
};

export const detailsUser = (userId) =>
  axiosPrivate([userDetailsActions], { req: userId })(
    'get',
    `/api/users/${userId}`
  );

export const updateUserProfile = (user) =>
  axiosPrivate([userUpdateProfileActions], {
    req: user,
    extDispatch: userSigninActions._SUCCESS,
    extHandler: (_data) => (Storage[KEY.USER_INFO] = _data)
  })('put', `/api/users/profile`, user);

export const updateUser = (user) =>
  axiosPrivate([userUpdateProfileActions, userUpdateActions], { req: user })(
    'put',
    `/api/users/${user._id}`,
    user
  );

export const listUsers = () =>
  axiosPrivate([userListActions])('get', '/api/users');

export const deleteUser = (userId) =>
  axiosPrivate([userDeleteActions], { req: userId })(
    'delete',
    `/api/users/${userId}`
  );

export const listTopSellers = () =>
  axiosPublic([userTopSellerListActions])('get', '/api/users/top-sellers');
