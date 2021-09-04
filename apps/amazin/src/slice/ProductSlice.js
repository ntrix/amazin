import { adapter, createSlice, Reducer } from './ReduxToolKitClient';
const rates = { EUR: 1, USD: 1.2, GBP: 0.9, CZK: 27, PLN: 5, CHF: 1.1 };

export const { actions: currencyTypeActions, reducer: currencyTypeReducer } = createSlice(
  adapter(
    'currencyType',
    { loading: true, rates },
    { ...Reducer('...'), _CHANGE: (state, action) => ({ ...state, sessionCurrency: action.payload }) }
  )
);

export const { actions: productListAllActions, reducer: productListAllReducer } = createSlice(
  adapter('productListAll', { loading: true, productList: [] }, Reducer('...'))
);

export const { actions: productListActions, reducer: productListReducer } = createSlice(
  adapter('productList', { loading: true, products: [] }, Reducer('...'))
);

export const { actions: productCategoryListActions, reducer: productCategoryListReducer } = createSlice(
  adapter('productCategoryList', { loading: true, products: [] }, Reducer('categories'))
);

export const { actions: productDetailsActions, reducer: productDetailsReducer } = createSlice(
  adapter('productDetails', { loading: true }, Reducer('product'))
);

export const { actions: productCreateActions, reducer: productCreateReducer } = createSlice(
  adapter('productCreate', {}, Reducer('product'))
);

export const { actions: productUpdateActions, reducer: productUpdateReducer } = createSlice(
  adapter('productUpdate', {}, Reducer())
);

export const { actions: productDeleteActions, reducer: productDeleteReducer } = createSlice(
  adapter('productDelete', {}, Reducer())
);

export const { actions: productReviewCreateActions, reducer: productReviewCreateReducer } = createSlice(
  adapter('productReviewCreate', {}, Reducer('review'))
);
