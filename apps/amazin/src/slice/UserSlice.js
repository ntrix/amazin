import { adapter, createSlice, Reducer } from './ReduxToolKitClient';
import { KEY } from '../constants';

export const { actions: userRegisterActions, reducer: userRegisterReducer } = createSlice(
  adapter('userRegister', {}, Reducer(KEY.USER_INFO))
);

export const { actions: userSigninActions, reducer: userSigninReducer } = createSlice(
  adapter('userSignin', {}, Reducer(KEY.USER_INFO))
);

export const { actions: userDetailsActions, reducer: userDetailsReducer } = createSlice(
  adapter('userDetails', { loading: true }, { ...Reducer('user'), _RESET: () => ({ loading: true }) })
);

export const { actions: userUpdateProfileActions, reducer: userUpdateProfileReducer } = createSlice(
  adapter('userUpdateProfile', {}, Reducer())
);

export const { actions: userUpdateActions, reducer: userUpdateReducer } = createSlice(
  adapter('userUpdate', {}, Reducer())
);

export const { actions: userListActions, reducer: userListReducer } = createSlice(
  adapter('userList', { loading: true }, Reducer('users'))
);

export const { actions: userDeleteActions, reducer: userDeleteReducer } = createSlice(
  adapter('userDelete', {}, Reducer())
);

export const { actions: userTopSellerListActions, reducer: userTopSellerListReducer } = createSlice(
  adapter('userTopSellerList', { loading: true }, Reducer('users'))
);

export const { actions: userAddressMapActions, reducer: userAddressMapReducer } = createSlice(
  adapter('userAddressMap', {}, { _CONFIRM: (state, action) => ({ address: action.payload }) })
);
