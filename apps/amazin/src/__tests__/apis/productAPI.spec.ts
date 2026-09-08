jest.mock('../../apis/axiosClient');

import { axios, axiosPublic, axiosPrivate } from '../../apis/axiosClient';
import {
  updateCurrencyRates,
  listAllProducts,
  listProducts,
  listExtMovies,
  listProductCategories,
  detailsProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  createReview
} from '../../apis/productAPI';
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
} from '../../slice/ProductSlice';
import { pipe } from '../../utils/currencyPipe';
import { VIDEO } from '../../constants';

const mockedAxiosPublic = axiosPublic as jest.MockedFunction<typeof axiosPublic>;
const mockedAxiosPrivate = axiosPrivate as jest.MockedFunction<typeof axiosPrivate>;
const mockedAxiosGet = axios.get as jest.MockedFunction<typeof axios.get>;

describe('productAPI', () => {
  let mockInnerCall: jest.Mock;
  const originalRates = { ...pipe.rates };

  beforeEach(() => {
    mockInnerCall = jest.fn(() => Promise.resolve());
    mockedAxiosPublic.mockReturnValue(mockInnerCall as never);
    mockedAxiosPrivate.mockReturnValue(mockInnerCall as never);
  });

  afterEach(() => {
    Object.assign(pipe.rates, originalRates);
  });

  test('updateCurrencyRates requests the rates and updates the pipe rates on success', () => {
    updateCurrencyRates();

    expect(mockedAxiosPublic).toHaveBeenCalledWith([currencyTypeActions], expect.objectContaining({ successHandler: expect.any(Function) }));
    expect(mockInnerCall).toHaveBeenCalledWith('get', '/api/config/rates');

    const { successHandler } = mockedAxiosPublic.mock.calls[0][1] as { successHandler: (d: unknown) => void };
    successHandler({ rates: { USD: 1.5 } });
    expect(pipe.rates.USD).toBe(1.5);
  });

  test('listAllProducts treats the "All" category as no filter', () => {
    listAllProducts({ category: 'All' } as never);
    expect(mockInnerCall).toHaveBeenCalledWith('get', '/api/products?pageSize=999&category=');
  });

  test('listProducts treats "All" category and name as no filter', () => {
    listProducts({ category: 'All', name: 'All' } as never);
    expect(mockedAxiosPublic).toHaveBeenCalledWith([productListActions]);
    expect(mockInnerCall).toHaveBeenCalledWith(
      'get',
      expect.stringContaining('&name=&category=')
    );
  });

  test('listExtMovies fetches every configured genre and adapts the results', async () => {
    mockedAxiosGet.mockResolvedValue({ data: { results: [{ title: 'A Movie' }] } } as never);

    const result = await listExtMovies();

    expect(result).toHaveLength(Object.keys(VIDEO.SRC).length);
    const [genre, adapted] = result[0];
    expect(typeof genre).toBe('string');
    expect(adapted[0].name).toBe('A Movie');
  });

  // NOTE: `.catch()` here has no handler (see src/apis/productAPI.ts), so it does nothing —
  // a single failing genre still rejects the whole Promise.all instead of degrading gracefully.
  // This test documents that real, currently-existing behavior.
  test('a single failing genre request rejects the whole listExtMovies call', async () => {
    mockedAxiosGet.mockRejectedValue(new Error('network down'));

    await expect(listExtMovies()).rejects.toThrow('network down');
  });

  test('listProductCategories fetches the category list', () => {
    listProductCategories();
    expect(mockedAxiosPublic).toHaveBeenCalledWith([productCategoryListActions]);
    expect(mockInnerCall).toHaveBeenCalledWith('get', '/api/products/categories');
  });

  test('detailsProduct fetches a single product', () => {
    detailsProduct('p1');
    expect(mockedAxiosPublic).toHaveBeenCalledWith([productDetailsActions]);
    expect(mockInnerCall).toHaveBeenCalledWith('get', '/api/products/p1');
  });

  test('createProduct posts a new blank product', () => {
    createProduct();
    expect(mockedAxiosPrivate).toHaveBeenCalledWith([productCreateActions], expect.objectContaining({ selector: expect.any(Function) }));
    expect(mockInnerCall).toHaveBeenCalledWith('post', '/api/products');
  });

  test('updateProduct puts the product to its own endpoint', () => {
    updateProduct({ _id: 'p1', name: 'Widget' } as never);
    expect(mockedAxiosPrivate).toHaveBeenCalledWith([productUpdateActions]);
    expect(mockInnerCall).toHaveBeenCalledWith('put', '/api/products/p1', { _id: 'p1', name: 'Widget' });
  });

  test('deleteProduct deletes the given product', () => {
    deleteProduct('p1');
    expect(mockedAxiosPrivate).toHaveBeenCalledWith([productDeleteActions]);
    expect(mockInnerCall).toHaveBeenCalledWith('delete', '/api/products/p1');
  });

  test('createReview posts a review under the product', () => {
    createReview('p1', { rating: 5, comment: 'Great' } as never);
    expect(mockedAxiosPrivate).toHaveBeenCalledWith(
      [productReviewCreateActions],
      expect.objectContaining({ selector: expect.any(Function) })
    );
    expect(mockInnerCall).toHaveBeenCalledWith('post', '/api/products/p1/reviews', { rating: 5, comment: 'Great' });
  });
});
