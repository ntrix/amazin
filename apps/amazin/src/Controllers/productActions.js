import { axiosPublic, axiosPrivate } from '../utils/axiosClient';
import {
  currencyTypeActions,
  productListAllActions,
  productListActions,
  productCategoryListActions,
  productDetailsActions,
  productCreateActions,
  productUpdateActions,
  productDeleteActions,
  productReviewCreateActions
} from '../Features/Product/ProductSlice';
import { pipe } from '../utils';

export const updateCurrencyRates = () =>
  axiosPublic()(currencyTypeActions)(null, (data) =>
    pipe.currencies.map((c) => (pipe.rates[c] = data.rates[c] || pipe.rates[c]))
  )('get', '/api/config/rates');

export const listAllProducts = ({ pageSize = 6, category = '' }) =>
  axiosPublic()(productListAllActions)()(
    'get',
    `/api/products?pageSize=999&category=${category}`
  );

export const listProducts = ({
  pageSize = 6,
  pageNumber = '',
  seller = '',
  name = '',
  category = '',
  order = '',
  deal = 0,
  min = 0.01,
  max = 0,
  rating = 0
}) =>
  axiosPublic()(productListActions)()(
    'get',
    `/api/products?pageSize=${pageSize}&pageNumber=${pageNumber}&seller=${seller}&name=${name}&category=${category}&deal=${deal}&min=${min}&max=${max}&rating=${rating}&order=${order}`
  );

export const listProductCategories = () =>
  axiosPublic()(productCategoryListActions)()(
    'get',
    `/api/products/categories`
  );

export const detailsProduct = (productId) =>
  axiosPublic(productId)(productDetailsActions)()(
    'get',
    `/api/products/${productId}`
  );

export const createProduct = () =>
  axiosPrivate()(productCreateActions)(null, null, (_data) => _data.product)(
    'post',
    '/api/products',
    {}
  );

export const updateProduct = (product) =>
  axiosPrivate(product)(productUpdateActions)()(
    'put',
    `/api/products/${product._id}`,
    product
  );

export const deleteProduct = (productId) =>
  axiosPrivate(productId)(productDeleteActions)(null, null, () => null)(
    'delete',
    `/api/products/${productId}`
  );

export const createReview = (productId, review) =>
  axiosPrivate()(productReviewCreateActions)(
    null,
    null,
    (_data) => _data.review
  )('post', `/api/products/${productId}/reviews`, review);
