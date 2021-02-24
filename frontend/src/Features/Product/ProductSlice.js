import { createSlice } from "@reduxjs/toolkit";

const productListSlice = createSlice({
  name: "productList",
  initialState: { loading: true, products: [] },
  reducers: {
    PRODUCT_LIST_REQUEST: (state, action) => ({ loading: true }),
    PRODUCT_LIST_SUCCESS: (state, action) => ({
      loading: false,
      products: action.payload.products,
      pages: action.payload.pages,
      page: action.payload.page,
    }),
    PRODUCT_LIST_FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
  },
});
const {
  actions: productListActions,
  reducer: productListReducer,
} = productListSlice;
export const {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} = productListActions;
export { productListReducer };

const productCategoryListSlice = createSlice({
  name: "productCategoryList",
  initialState: { loading: true, products: [] },
  reducers: {
    PRODUCT_CATEGORY_LIST_REQUEST: (state, action) => ({
      loading: true,
    }),
    PRODUCT_CATEGORY_LIST_SUCCESS: (state, action) => ({
      loading: false,
      categories: action.payload,
    }),
    PRODUCT_CATEGORY_LIST_FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
  },
});
const {
  actions: productCategoryListActions,
  reducer: productCategoryListReducer,
} = productCategoryListSlice;
export const {
  PRODUCT_CATEGORY_LIST_SUCCESS,
  PRODUCT_CATEGORY_LIST_REQUEST,
  PRODUCT_CATEGORY_LIST_FAIL,
} = productCategoryListActions;
export { productCategoryListReducer };

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: { loading: true },
  reducers: {
    PRODUCT_DETAILS_REQUEST: (state, action) => ({
      loading: true,
    }),
    PRODUCT_DETAILS_SUCCESS: (state, action) => ({
      loading: false,
      product: action.payload,
    }),
    PRODUCT_DETAILS_FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
  },
});
const {
  actions: productDetailsActions,
  reducer: productDetailsReducer,
} = productDetailsSlice;
export const {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} = productDetailsActions;
export { productDetailsReducer };

const productCreateSlice = createSlice({
  name: "productCreate",
  initialState: {},
  reducers: {
    abc: (state, action) => ({}),
    PRODUCT_CREATE_REQUEST: (state, action) => ({
      loading: true,
    }),
    PRODUCT_CREATE_SUCCESS: (state, action) => ({
      loading: false,
      success: true,
      product: action.payload,
    }),
    PRODUCT_CREATE_FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
    PRODUCT_CREATE_RESET: (state, action) => ({}),
  },
});
const {
  actions: productCreateActions,
  reducer: productCreateReducer,
} = productCreateSlice;
export const {
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
} = productCreateActions;
export { productCreateReducer };

const productUpdateSlice = createSlice({
  name: "productUpdate",
  initialState: {},
  reducers: {
    abc: (state, action) => ({}),
    PRODUCT_UPDATE_REQUEST: (state, action) => ({
      loading: true,
    }),
    PRODUCT_UPDATE_SUCCESS: (state, action) => ({
      loading: false,
      success: true,
    }),
    PRODUCT_UPDATE_FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
    PRODUCT_UPDATE_RESET: (state, action) => ({}),
  },
});
const {
  actions: productUpdateActions,
  reducer: productUpdateReducer,
} = productUpdateSlice;
export const {
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
} = productUpdateActions;
export { productUpdateReducer };

const productDeleteSlice = createSlice({
  name: "productDelete",
  initialState: {},
  reducers: {
    PRODUCT_DELETE_REQUEST: (state, action) => ({
      loading: true,
    }),
    PRODUCT_DELETE_SUCCESS: (state, action) => ({
      loading: false,
      success: true,
    }),
    PRODUCT_DELETE_FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
    PRODUCT_DELETE_RESET: (state, action) => ({}),
  },
});
const {
  actions: productDeleteActions,
  reducer: productDeleteReducer,
} = productDeleteSlice;
export const {
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_RESET,
} = productDeleteActions;
export { productDeleteReducer };

const productReviewCreateSlice = createSlice({
  name: "productReviewCreate",
  initialState: {},
  reducers: {
    PRODUCT_REVIEW_CREATE_REQUEST: (state, action) => ({
      loading: true,
    }),
    PRODUCT_REVIEW_CREATE_SUCCESS: (state, action) => ({
      loading: false,
      success: true,
      review: action.payload,
    }),
    PRODUCT_REVIEW_CREATE_FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
    PRODUCT_REVIEW_CREATE_RESET: (state, action) => ({}),
  },
});
const {
  actions: productReviewCreateActions,
  reducer: productReviewCreateReducer,
} = productReviewCreateSlice;
export const {
  PRODUCT_REVIEW_CREATE_REQUEST,
  PRODUCT_REVIEW_CREATE_SUCCESS,
  PRODUCT_REVIEW_CREATE_FAIL,
  PRODUCT_REVIEW_CREATE_RESET,
} = productReviewCreateActions;
export { productReviewCreateReducer };
