import { createSlice, Reducer } from '../../utils/ReduxToolKitClient';
import { STORAGE } from '../../constants';

export const { actions: userRegisterActions, reducer: userRegisterReducer } =
  createSlice({
    name: 'userRegister',
    initialState: {},
    reducers: Reducer(STORAGE.USERINFO)
  });

export const { actions: userSigninActions, reducer: userSigninReducer } =
  createSlice({
    name: 'userSignin',
    initialState: {},
    reducers: Reducer(STORAGE.USERINFO)
  });

export const { actions: userDetailsActions, reducer: userDetailsReducer } =
  createSlice({
    name: 'userDetails',
    initialState: { loading: true },
    reducers: { ...Reducer('user'), _RESET: () => ({ loading: true }) }
  });

export const {
  actions: userUpdateProfileActions,
  reducer: userUpdateProfileReducer
} = createSlice({
  name: 'userUpdateProfile',
  initialState: {},
  reducers: Reducer()
});

export const { actions: userUpdateActions, reducer: userUpdateReducer } =
  createSlice({
    name: 'userUpdate',
    initialState: {},
    reducers: Reducer()
  });

export const { actions: userListActions, reducer: userListReducer } =
  createSlice({
    name: 'userList',
    initialState: { loading: true },
    reducers: Reducer('users')
  });

export const { actions: userDeleteActions, reducer: userDeleteReducer } =
  createSlice({
    name: 'userDelete',
    initialState: {},
    reducers: Reducer()
  });

export const {
  actions: userTopSellerListActions,
  reducer: userTopSellerListReducer
} = createSlice({
  name: 'userTopSellerList',
  initialState: { loading: true },
  reducers: Reducer('users')
});

export const {
  actions: userAddressMapActions,
  reducer: userAddressMapReducer
} = createSlice({
  name: 'userAddressMap',
  initialState: {},
  reducers: {
    _CONFIRM: (state, action) => ({
      address: action.payload
    })
  }
});
