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
  productReviewCreateActions,
} from '../slice/ProductSlice';
import { FilterOptType, NAV, SourceType, VIDEO } from 'src/constants';
import { pipe, sourceAdapter } from 'src/utils';
import Sentry from 'src/utils/sentry';

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
  rating = 0,
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
    selector: (_data) => _data.review,
  })('post', `/api/products/${productId}/reviews`, review);

// Each genre fails independently - previously a bare `.catch()` (no handler)
// on one genre's request left `data` undefined, and reading `data.results`
// threw, rejecting the whole Promise.all and wiping out every other genre's
// row too. Also silent: no Sentry report, so a config problem (e.g. a
// missing/invalid REACT_APP_API_KEY) looked identical to "no movies today".
export const listExtMovies = () =>
  Promise.all(
    (Object.keys(VIDEO.SRC) as SourceType[]).map(async (genre) => {
      try {
        // axios.defaults.withCredentials = true (axiosClient.ts) is global -
        // TMDB is a third party, not our backend, and must not get it: a
        // browser rejects a credentialed request outright when the server's
        // Access-Control-Allow-Origin is the wildcard "*", which is exactly
        // what TMDB returns, so this call would otherwise fail every time.
        const { data } = await axios.get(VIDEO.URL + VIDEO.SRC[genre], { withCredentials: false });
        return [genre, sourceAdapter(data.results)];
      } catch (error) {
        Sentry.captureException(error);
        return [genre, []];
      }
    })
  );
