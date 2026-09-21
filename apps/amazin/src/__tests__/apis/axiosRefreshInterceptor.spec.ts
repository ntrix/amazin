import axios from 'axios';
import { KEY } from '../../constants';
import { Storage } from '../../utils';
import { userSigninActions } from '../../slice/UserSlice';

// side effect: registers the real interceptor under test via axios.interceptors.response.use(...)
import '../../apis/axiosClient';

const mockDispatch = jest.fn();
const mockGetState = jest.fn();

jest.mock('src/store', () => ({
  __esModule: true,
  default: { dispatch: (...args: unknown[]) => mockDispatch(...args), getState: () => mockGetState() },
}));

// var (not let) - `var` is hoisted with the rest of this module's top-level
// imports, avoiding a temporal-dead-zone crash when axiosClient.ts's
// `axios.interceptors.response.use(...)` call assigns this during import
// eslint-disable-next-line no-var
var errorInterceptor: (error: unknown) => Promise<unknown>;

jest.mock('axios', () => {
  const instance = jest.fn();
  return {
    __esModule: true,
    default: Object.assign(instance, {
      create: jest.fn(() => instance),
      post: jest.fn(),
      defaults: {},
      interceptors: {
        response: {
          use: jest.fn((_success, error) => {
            errorInterceptor = error;
          }),
        },
      },
    }),
  };
});

const mockedAxios = axios as unknown as jest.Mock & { post: jest.Mock };

describe('axios 401 refresh interceptor', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    mockedAxios.post.mockClear();
    mockedAxios.mockClear();
    mockGetState.mockReset().mockReturnValue({ userSignin: { userInfo: { token: 'old-token' } } });
    Storage[KEY.USER_INFO] = { token: 'old-token' };
  });

  test('refreshes the access token and retries the original request on 401', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { token: 'new-token' } });
    mockedAxios.mockResolvedValueOnce({ data: { retried: true } });

    const error = { response: { status: 401 }, config: { url: '/api/orders', headers: {} } };
    const result = await errorInterceptor(error);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining('/api/users/refresh'),
      null,
      expect.any(Object)
    );
    expect(mockDispatch).toHaveBeenCalledWith(
      userSigninActions._SUCCESS(expect.objectContaining({ token: 'new-token' }))
    );
    expect(mockedAxios).toHaveBeenCalledWith(
      expect.objectContaining({ headers: expect.objectContaining({ Authorization: 'Bearer new-token' }) })
    );
    expect(result).toEqual({ data: { retried: true } });
  });

  test('does not attempt a refresh for a 401 from the refresh endpoint itself', async () => {
    const error = { response: { status: 401 }, config: { url: '/api/users/refresh', headers: {} } };

    await expect(errorInterceptor(error)).rejects.toBe(error);
    expect(mockedAxios.post).not.toHaveBeenCalled();
  });

  test('does not attempt a refresh for a 401 from signin (wrong password, not an expired token)', async () => {
    const error = { response: { status: 401 }, config: { url: '/api/users/signin', headers: {} } };

    await expect(errorInterceptor(error)).rejects.toBe(error);
    expect(mockedAxios.post).not.toHaveBeenCalled();
  });

  test('forces a sign-out when the refresh call itself fails', async () => {
    mockedAxios.post.mockRejectedValueOnce({ response: { status: 401 } });

    const error = { response: { status: 401 }, config: { url: '/api/orders', headers: {} } };
    await expect(errorInterceptor(error)).rejects.toBe(error);

    expect(Storage[KEY.USER_INFO]).toBe('');
    expect(mockDispatch).toHaveBeenCalledWith(userSigninActions._RESET(''));
  });

  test('only issues one refresh call for concurrent 401s', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { token: 'new-token' } });
    mockedAxios.mockResolvedValue({ data: {} });

    const errorA = { response: { status: 401 }, config: { url: '/api/orders', headers: {} } };
    const errorB = { response: { status: 401 }, config: { url: '/api/products', headers: {} } };

    await Promise.all([errorInterceptor(errorA), errorInterceptor(errorB)]);

    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
  });
});
