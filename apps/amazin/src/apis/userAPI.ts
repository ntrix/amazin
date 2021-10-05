import { Method } from 'axios';
import { axios, axiosPublic, axiosPrivate } from './axiosClient';
import {
  userRegisterActions,
  userSigninActions,
  userDetailsActions,
  userUpdateProfileActions,
  userUpdateActions,
  userListActions,
  userDeleteActions,
  userTopSellerListActions
} from '../slice/UserSlice';
import { Storage } from '../utils';
import { KEY } from '../constants';
import { MAIL_SERVER, HEADERS } from 'src/constants';

export const register = (name: string, email: string, password: string, confirmPassword: string) =>
  axiosPublic([userRegisterActions], {
    successAction: userSigninActions._SUCCESS,
    successHandler: (_data) => (Storage[KEY.USER_INFO] = _data)
  })('post', '/api/users/register', {
    name,
    email,
    password,
    confirmPassword
  });

export const signin = (email: string, password: string) =>
  axiosPublic([userSigninActions], { successHandler: (_data) => (Storage[KEY.USER_INFO] = _data) })(
    'post',
    '/api/users/signin',
    {
      email,
      password
    }
  );

export const signout = () => (dispatch: AppDispatch) => {
  Storage[KEY.USER_INFO] = '';
  Storage[KEY.CART_ITEMS] = '';
  Storage[KEY.SHIPPING_ADDRESS] = '';
  dispatch(userSigninActions._RESET(''));
  document.location.href = '/signin';
};

export const publicDetailsSeller = (_id: string) => axiosPublic([userDetailsActions])('get', `/api/users/${_id}`);

export const detailsUser = (_id: string) => axiosPrivate([userDetailsActions])('get', `/api/users/${_id}`);

/* Types: UserType for contact form, ReqLogin for profile update with request login info. */
export const updateUserProfile = (user: UserType & ReqLogin, method: Method = 'patch') =>
  axiosPrivate([userUpdateProfileActions], {
    successAction: method !== 'patch' ? userDetailsActions._SUCCESS : userSigninActions._SUCCESS,
    successHandler: (userInfo) => (Storage[KEY.USER_INFO] = userInfo)
  })(method, `/api/users/profile`, user);

export const updateUser = (user: UserType) =>
  axiosPrivate([userUpdateProfileActions, userUpdateActions])('put', `/api/users/${user._id}`, user);

export const listUsers = () => axiosPrivate([userListActions])('get', '/api/users');

export const deleteUser = (_id: string) => axiosPrivate([userDeleteActions])('delete', `/api/users/${_id}`);

export const listTopSellers = () => axiosPublic([userTopSellerListActions])('get', '/api/users/top-sellers');

/* this contact will not be sent to redux store since MAIL_SERVER is different origin */
export const sendContactMessage =
  (contactData: ContactType, setStatus: SetStateType<StatusType>) => async (dispatch: AppDispatch) => {
    setStatus({ loading: true, msg: 'Your message is being sent.' });
    try {
      await axios.post(MAIL_SERVER, contactData, { headers: { ...HEADERS, body: JSON.stringify(contactData) } });
      setStatus({ msg: 'Thank you! Your message has been sent.' });
    } catch (error) {
      if (error instanceof Error) setStatus({ error: error.message });
    }
    dispatch(userUpdateProfileActions._RESET(''));
  };
