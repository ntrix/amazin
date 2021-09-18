import { adapter, createSlice, createReducers } from './ReduxToolKitClient';

const rates = { EUR: 1, USD: 1.2, GBP: 0.9, CZK: 27, PLN: 5, CHF: 1.1 };

export const { actions: currencyTypeActions, reducer: currencyTypeReducer } = createSlice(
  adapter(
    'currencyType',
    { loading: true, rates },
    createReducers('...', () => ({
      _CHANGE: (state: AppState, action: SliceAction) => ({ ...state, sessionCurrency: action.payload })
    }))
  )
);

export const { actions: productListAllActions, reducer: productListAllReducer } = createSlice(
  adapter('productListAll', { loading: true, productList: [] }, createReducers('...'))
);

const initProductList = { loading: true, productList: [] };

export const { actions: productListActions, reducer: productListReducer } = createSlice(
  adapter('productList', initProductList, createReducers('...'))
);

export const { actions: productCategoryListActions, reducer: productCategoryListReducer } = createSlice(
  adapter('productCategoryList', initProductList, createReducers('categories'))
);

export const { actions: productDetailsActions, reducer: productDetailsReducer } = createSlice(
  adapter('productDetails', { loading: true }, createReducers('product'))
);

export const { actions: productCreateActions, reducer: productCreateReducer } = createSlice(
  adapter('productCreate', {}, createReducers('product'))
);

export const { actions: productUpdateActions, reducer: productUpdateReducer } = createSlice(
  adapter('productUpdate', {}, createReducers())
);

export const { actions: productDeleteActions, reducer: productDeleteReducer } = createSlice(
  adapter('productDelete', {}, createReducers())
);

export const { actions: productReviewCreateActions, reducer: productReviewCreateReducer } = createSlice(
  adapter('productReviewCreate', {}, createReducers('review'))
);
