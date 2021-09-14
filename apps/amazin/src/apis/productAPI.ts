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
} from '../slice/ProductSlice';
import { pipe } from '../utils';
import { NAV } from '../constants';

const updatePipe = (data: { rates: number[] }) =>
  pipe.currencies.forEach((c) => {
    if (data.rates && data.rates[c]) pipe.rates[c] = data.rates[c];
  });

export const updateCurrencyRates = () =>
  axiosPublic([currencyTypeActions], { successHandler: updatePipe })('get', '/api/config/rates');

export const listAllProducts = ({ pageSize = 999, category = '' }) => {
  if (category === NAV.ALL) category = '';
  return axiosPublic([productListAllActions])('get', `/api/products?pageSize=${pageSize}&category=${category}`);
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
}: {
  pageSize?: number | string;
  pageNumber?: number | string;
  seller?: number | string;
  name?: number | string;
  category?: number | string;
  order?: number | string;
  deal?: number | string;
  min?: number | string;
  max?: number | string;
  rating?: number | string;
}) => {
  if (category === NAV.ALL) category = '';
  if (name === NAV.ALL) name = '';
  return axiosPublic([productListActions])(
    'get',
    `/api/products?pageSize=${pageSize}&pageNumber=${pageNumber}&seller=${seller}&name=${name}&category=${category}&deal=${deal}&min=${min}&max=${max}&rating=${rating}&order=${order}`
  );
};

export const listProductCategories = () => axiosPublic([productCategoryListActions])('get', `/api/products/categories`);

export const detailsProduct = (productId: string) =>
  axiosPublic([productDetailsActions])('get', `/api/products/${productId}`);

export const createProduct = () =>
  axiosPrivate([productCreateActions], { selector: (_data) => _data.product })('post', '/api/products');

export const updateProduct = (product: ProductType) =>
  axiosPrivate([productUpdateActions])('put', `/api/products/${product._id}`, product);

export const deleteProduct = (productId: string) =>
  axiosPrivate([productDeleteActions])('delete', `/api/products/${productId}`);

export const createReview = (productId: ProductType, review: ReviewType) =>
  axiosPrivate([productReviewCreateActions], {
    selector: (_data) => _data.review
  })('post', `/api/products/${productId}/reviews`, review);
