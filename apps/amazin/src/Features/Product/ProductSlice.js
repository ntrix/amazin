import { createSlice, Reducer } from '../../utils/ReduxToolKitClient';

export const { actions: currencyTypeActions, reducer: currencyTypeReducer } =
  createSlice({
    name: 'currencyType',
    initialState: {
      loading: true,
      rates: {
        EUR: 1,
        USD: 1.2,
        GBP: 0.9,
        CZK: 27,
        PLN: 5,
        CHF: 1.1
      }
    },
    reducers: {
      ...Reducer('...'),
      _CHANGE: (state, action) => ({
        ...state,
        sessionCurrency: action.payload
      })
    }
  });

export const {
  actions: productListAllActions,
  reducer: productListAllReducer
} = createSlice({
  name: 'productListAll',
  initialState: { loading: true, productList: [] },
  reducers: Reducer('...')
});

export const { actions: productListActions, reducer: productListReducer } =
  createSlice({
    name: 'productList',
    initialState: { loading: true, products: [] },
    reducers: Reducer('...')
  });

export const {
  actions: productCategoryListActions,
  reducer: productCategoryListReducer
} = createSlice({
  name: 'productCategoryList',
  initialState: { loading: true, products: [] },
  reducers: Reducer('categories')
});

export const {
  actions: productDetailsActions,
  reducer: productDetailsReducer
} = createSlice({
  name: 'productDetails',
  initialState: { loading: true },
  reducers: Reducer('product')
});

export const { actions: productCreateActions, reducer: productCreateReducer } =
  createSlice({
    name: 'productCreate',
    initialState: {},
    reducers: Reducer('product')
  });

export const { actions: productUpdateActions, reducer: productUpdateReducer } =
  createSlice({
    name: 'productUpdate',
    initialState: {},
    reducers: Reducer()
  });

export const { actions: productDeleteActions, reducer: productDeleteReducer } =
  createSlice({
    name: 'productDelete',
    initialState: {},
    reducers: Reducer()
  });

export const {
  actions: productReviewCreateActions,
  reducer: productReviewCreateReducer
} = createSlice({
  name: 'productReviewCreate',
  initialState: {},
  reducers: Reducer('review')
});
