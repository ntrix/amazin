import { createSlice } from "@reduxjs/toolkit";

export const {
  actions: productListActions,
  reducer: productListReducer,
} = createSlice({
  name: "productList",
  initialState: { loading: true, products: [] },
  reducers: {
    _REQUEST: (state, action) => ({ loading: true }),
    _SUCCESS: (state, action) => ({
      ...action.payload,
      loading: false,
    }),
    _FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
  },
});

export const {
  actions: productListAllActions,
  reducer: productListAllReducer,
} = createSlice({
  name: "productListAll",
  initialState: { loading: true, productList: [] },
  reducers: {
    _REQUEST: (state, action) => ({ loading: true }),
    _SUCCESS: (state, action) => ({
      ...action.payload,
      loading: false,
    }),
    _FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
  },
});

export const {
  actions: productCategoryListActions,
  reducer: productCategoryListReducer,
} = createSlice({
  name: "productCategoryList",
  initialState: { loading: true, products: [] },
  reducers: {
    _REQUEST: (state, action) => ({
      loading: true,
    }),
    _SUCCESS: (state, action) => ({
      loading: false,
      categories: action.payload,
    }),
    _FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
  },
});

export const {
  actions: productDetailsActions,
  reducer: productDetailsReducer,
} = createSlice({
  name: "productDetails",
  initialState: { loading: true },
  reducers: {
    _REQUEST: (state, action) => ({
      loading: true,
    }),
    _SUCCESS: (state, action) => ({
      loading: false,
      product: action.payload,
    }),
    _FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
  },
});

export const {
  actions: productCreateActions,
  reducer: productCreateReducer,
} = createSlice({
  name: "productCreate",
  initialState: {},
  reducers: {
    _REQUEST: (state, action) => ({
      loading: true,
    }),
    _SUCCESS: (state, action) => ({
      loading: false,
      success: true,
      product: action.payload,
    }),
    _FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
    _RESET: (state, action) => ({}),
  },
});

export const {
  actions: productUpdateActions,
  reducer: productUpdateReducer,
} = createSlice({
  name: "productUpdate",
  initialState: {},
  reducers: {
    _REQUEST: (state, action) => ({
      loading: true,
    }),
    _SUCCESS: (state, action) => ({
      loading: false,
      success: true,
    }),
    _FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
    _RESET: (state, action) => ({}),
  },
});

export const {
  actions: productDeleteActions,
  reducer: productDeleteReducer,
} = createSlice({
  name: "productDelete",
  initialState: {},
  reducers: {
    _REQUEST: (state, action) => ({
      loading: true,
    }),
    _SUCCESS: (state, action) => ({
      loading: false,
      success: true,
    }),
    _FAIL: (state, action) => ({
      loading: false,
      error: action.payload,
    }),
    _RESET: (state, action) => ({}),
  },
});

export const {
  actions: productReviewCreateActions,
  reducer: productReviewCreateReducer,
} = createSlice({
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
