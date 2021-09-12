import { adapter, createSlice, createReducers } from './ReduxToolKitClient';
import { KEY } from '../constants';

export const { actions: userRegisterActions, reducer: userRegisterReducer } = createSlice(
  adapter('userRegister', {}, createReducers(KEY.USER_INFO))
);

export const { actions: userSigninActions, reducer: userSigninReducer } = createSlice(
  adapter('userSignin', {}, createReducers(KEY.USER_INFO))
);

export const { actions: userDetailsActions, reducer: userDetailsReducer } = createSlice(
  adapter('userDetails', { loading: true }, createReducers('user', { _RESET: () => ({ loading: true }) }))
);

export const { actions: userUpdateProfileActions, reducer: userUpdateProfileReducer } = createSlice(
  adapter('userUpdateProfile', {}, createReducers())
);

export const { actions: userUpdateActions, reducer: userUpdateReducer } = createSlice(
  adapter('userUpdate', {}, createReducers())
);

export const { actions: userListActions, reducer: userListReducer } = createSlice(
  adapter('userList', { loading: true }, createReducers('users'))
);

export const { actions: userDeleteActions, reducer: userDeleteReducer } = createSlice(
  adapter('userDelete', {}, createReducers())
);

export const { actions: userTopSellerListActions, reducer: userTopSellerListReducer } = createSlice(
  adapter('userTopSellerList', { loading: true }, createReducers('users'))
);

export const { actions: userAddressMapActions, reducer: userAddressMapReducer } = createSlice(
  adapter('userAddressMap', {}, { _CONFIRM: (state: AppState, action: SliceAction) => ({ address: action.payload }) })
);
