import { axiosPublic, axiosPrivate } from './axiosClient';
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
import { NAV } from '../constants';

const updatePipe = (data) =>
  pipe.currencies.forEach((c) => {
    if (data.rates && data.rates[c]) pipe.rates[c] = data.rates[c];
  });

export const updateCurrencyRates = () =>
  axiosPublic([currencyTypeActions], { extHandler: updatePipe })(
    'get',
    '/api/config/rates'
  );

export const listAllProducts = ({ pageSize = 999, category = '' }) => {
  if (category === NAV.ALL) category = '';
  return axiosPublic([productListAllActions])(
    'get',
    `/api/products?pageSize=${pageSize}&category=${category}`
  );
};

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
}) => {
  if (category === NAV.ALL) category = '';
  if (name === NAV.ALL) name = '';
  return axiosPublic([productListActions])(
    'get',
    `/api/products?pageSize=${pageSize}&pageNumber=${pageNumber}&seller=${seller}&name=${name}&category=${category}&deal=${deal}&min=${min}&max=${max}&rating=${rating}&order=${order}`
  );
};

export const listProductCategories = () =>
  axiosPublic([productCategoryListActions])('get', `/api/products/categories`);

export const detailsProduct = (productId) =>
  axiosPublic([productDetailsActions], { req: productId })(
    'get',
    `/api/products/${productId}`
  );

export const createProduct = () =>
  axiosPrivate([productCreateActions], { selector: (_data) => _data.product })(
    'post',
    '/api/products',
    {}
  );

export const updateProduct = (product) =>
  axiosPrivate([productUpdateActions], { req: product })(
    'put',
    `/api/products/${product._id}`,
    product
  );

export const deleteProduct = (productId) =>
  axiosPrivate([productDeleteActions], { req: productId })(
    'delete',
    `/api/products/${productId}`
  );

export const createReview = (productId, review) =>
  axiosPrivate([productReviewCreateActions], {
    selector: (_data) => _data.review
  })('post', `/api/products/${productId}/reviews`, review);
