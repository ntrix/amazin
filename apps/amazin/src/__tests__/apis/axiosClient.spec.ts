jest.mock('axios', () => {
  const mockAxiosInstance = jest.fn();
  return {
    __esModule: true,
    default: Object.assign(mockAxiosInstance, { create: jest.fn(() => mockAxiosInstance) })
  };
});

import axios from 'axios';
import { axiosPublic, axiosPrivate } from '../../apis/axiosClient';

const mockedAxios = axios as unknown as jest.Mock;

function makeActions(name: string) {
  return {
    _REQUEST: jest.fn(() => ({ type: `${name}/_REQUEST` })),
    _SUCCESS: jest.fn((payload) => ({ type: `${name}/_SUCCESS`, payload })),
    _FAIL: jest.fn((payload) => ({ type: `${name}/_FAIL`, payload }))
  };
}

describe('axiosPublic / axiosPrivate', () => {
  beforeEach(() => {
    mockedAxios.mockReset();
  });

  test('dispatches _REQUEST before the call and _SUCCESS with the response data after it resolves', async () => {
    mockedAxios.mockResolvedValueOnce({ data: { id: 1 } });
    const actions = makeActions('thing');
    const dispatch = jest.fn();
    const getState = jest.fn(() => ({}));

    await axiosPublic([actions])('get', '/api/things')(dispatch, getState);

    expect(dispatch).toHaveBeenNthCalledWith(1, actions._REQUEST());
    expect(dispatch).toHaveBeenNthCalledWith(2, actions._SUCCESS({ id: 1 }));
  });

  test('axiosPublic does not attach an Authorization header', async () => {
    mockedAxios.mockResolvedValueOnce({ data: {} });
    const actions = makeActions('thing');

    await axiosPublic([actions])('get', '/api/things')(jest.fn(), jest.fn(() => ({})));

    expect(mockedAxios).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ headers: undefined }));
  });

  test('axiosPrivate attaches a Bearer token read from redux state', async () => {
    mockedAxios.mockResolvedValueOnce({ data: {} });
    const actions = makeActions('thing');
    const getState = jest.fn(() => ({ userSignin: { userInfo: { token: 'abc123' } } }));

    await axiosPrivate([actions])('get', '/api/things')(jest.fn(), getState);

    expect(mockedAxios).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ headers: expect.objectContaining({ Authorization: 'Bearer abc123' }) })
    );
  });

  test('calls successAction and successHandler in addition to the slice action on success', async () => {
    mockedAxios.mockResolvedValueOnce({ data: { id: 7 } });
    const actions = makeActions('thing');
    const successAction = jest.fn((data) => ({ type: 'EXTRA', data }));
    const successHandler = jest.fn();
    const dispatch = jest.fn();

    await axiosPublic([actions], { successAction, successHandler })('get', '/api/things')(dispatch, jest.fn(() => ({})));

    expect(successHandler).toHaveBeenCalledWith({ id: 7 });
    expect(dispatch).toHaveBeenCalledWith(successAction({ id: 7 }));
  });

  test('dispatches _FAIL with the server error message when the request rejects', async () => {
    mockedAxios.mockRejectedValueOnce({ response: { data: { message: 'Not found' } } });
    const actions = makeActions('thing');
    const dispatch = jest.fn();

    await axiosPublic([actions])('get', '/api/things')(dispatch, jest.fn(() => ({})));

    expect(dispatch).toHaveBeenCalledWith(actions._FAIL('Not found'));
  });

  test('dispatches _FAIL when the response is an HTML error page instead of JSON', async () => {
    mockedAxios.mockResolvedValueOnce({ data: '<!DOCTYPE html><html>Server Error</html>' });
    const actions = makeActions('thing');
    const dispatch = jest.fn();

    await axiosPublic([actions])('get', '/api/things')(dispatch, jest.fn(() => ({})));

    expect(dispatch).toHaveBeenCalledWith(actions._FAIL("Couldn't access Database Server!"));
  });
});
