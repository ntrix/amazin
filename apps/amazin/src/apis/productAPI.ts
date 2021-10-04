import { axios, axiosPublic, axiosPrivate } from './axiosClient';
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
import { FilterOptType, NAV, VIDEO } from 'src/constants';
import { pipe, sourceAdapter } from 'src/utils';

const updatePipe = (data: { rates: CurrRateType }) =>
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
}: FilterOptType) => {
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

export const createReview = (productId: string, review: Partial<ReviewType>) =>
  axiosPrivate([productReviewCreateActions], {
    selector: (_data) => _data.review
  })('post', `/api/products/${productId}/reviews`, review);

export const listExtMovies = () =>
  Promise.all(
    (Object.keys(VIDEO.SRC) as SourceType[]).map(async (genre) => {
      const { data } = await axios.get(VIDEO.URL + VIDEO.SRC[genre]).catch();
      return [genre, sourceAdapter(data.results)];
    })
  );
