jest.mock('../../apis/axiosClient');

import { axios, axiosPublic } from '../../apis/axiosClient';
import { updateCurrencyRates, listAllProducts, listProducts, listExtMovies } from '../../apis/productAPI';
import { currencyTypeActions, productListAllActions, productListActions } from '../../slice/ProductSlice';
import { pipe } from '../../utils/currencyPipe';
import { VIDEO } from '../../constants';

const mockedAxiosPublic = axiosPublic as jest.MockedFunction<typeof axiosPublic>;
const mockedAxiosGet = axios.get as jest.MockedFunction<typeof axios.get>;

describe('productAPI', () => {
  let mockInnerCall: jest.Mock;
  const originalRates = { ...pipe.rates };

  beforeEach(() => {
    mockInnerCall = jest.fn(() => Promise.resolve());
    mockedAxiosPublic.mockReturnValue(mockInnerCall as never);
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
});
