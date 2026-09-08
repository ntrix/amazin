jest.mock('../../apis/axiosClient');

import { axios, axiosPublic, axiosPrivate } from '../../apis/axiosClient';
import {
  register,
  signin,
  signout,
  detailsUser,
  updateUserProfile,
  updateUser,
  sendContactMessage
} from '../../apis/userAPI';
import { userRegisterActions, userSigninActions, userDetailsActions, userUpdateProfileActions, userUpdateActions } from '../../slice/UserSlice';
import { Storage } from '../../utils';
import { KEY } from '../../constants';

const mockedAxiosPublic = axiosPublic as jest.MockedFunction<typeof axiosPublic>;
const mockedAxiosPrivate = axiosPrivate as jest.MockedFunction<typeof axiosPrivate>;
const mockedAxiosPost = axios.post as jest.MockedFunction<typeof axios.post>;

describe('userAPI', () => {
  let mockInnerCall: jest.Mock;

  beforeEach(() => {
    mockInnerCall = jest.fn(() => Promise.resolve());
    mockedAxiosPublic.mockReturnValue(mockInnerCall as never);
    mockedAxiosPrivate.mockReturnValue(mockInnerCall as never);
  });

  test('register posts to /api/users/register with the form fields', () => {
    register('Ada', 'ada@example.com', 'Secret123', 'Secret123');

    expect(mockedAxiosPublic).toHaveBeenCalledWith(
      [userRegisterActions],
      expect.objectContaining({ successAction: userSigninActions._SUCCESS, successHandler: expect.any(Function) })
    );
    expect(mockInnerCall).toHaveBeenCalledWith('post', '/api/users/register', {
      name: 'Ada',
      email: 'ada@example.com',
      password: 'Secret123',
      confirmPassword: 'Secret123'
    });
  });

  test('signin posts to /api/users/signin with the credentials', () => {
    signin('ada@example.com', 'Secret123');

    expect(mockedAxiosPublic).toHaveBeenCalledWith([userSigninActions], expect.objectContaining({ successHandler: expect.any(Function) }));
    expect(mockInnerCall).toHaveBeenCalledWith('post', '/api/users/signin', { email: 'ada@example.com', password: 'Secret123' });
  });

  test('signout clears the local storage keys and resets the sign-in state', () => {
    Storage[KEY.USER_INFO] = { _id: 'u1' };
    const dispatch = jest.fn();

    signout()(dispatch);

    expect(Storage[KEY.USER_INFO]).toBe('');
    expect(dispatch).toHaveBeenCalledWith(userSigninActions._RESET(''));
  });

  test('detailsUser fetches a single user through the authenticated client', () => {
    detailsUser('u1');
    expect(mockedAxiosPrivate).toHaveBeenCalledWith([userDetailsActions]);
    expect(mockInnerCall).toHaveBeenCalledWith('get', '/api/users/u1');
  });

  test('updateUserProfile defaults to patch and reports success back to the signin slice', () => {
    updateUserProfile({ _id: 'u1', name: 'Ada', email: 'ada@example.com' } as never);

    expect(mockedAxiosPrivate).toHaveBeenCalledWith(
      [userUpdateProfileActions],
      expect.objectContaining({ successAction: userSigninActions._SUCCESS })
    );
    expect(mockInnerCall).toHaveBeenCalledWith('patch', '/api/users/profile', { _id: 'u1', name: 'Ada', email: 'ada@example.com' });
  });

  test('updateUserProfile reports success to the details slice for any other method', () => {
    updateUserProfile({ _id: 'u1' } as never, 'put');

    expect(mockedAxiosPrivate).toHaveBeenCalledWith(
      [userUpdateProfileActions],
      expect.objectContaining({ successAction: userDetailsActions._SUCCESS })
    );
  });

  test('updateUser puts to the user-specific admin endpoint', () => {
    updateUser({ _id: 'u2', name: 'Bob' } as never);

    expect(mockedAxiosPrivate).toHaveBeenCalledWith([userUpdateProfileActions, userUpdateActions]);
    expect(mockInnerCall).toHaveBeenCalledWith('put', '/api/users/u2', { _id: 'u2', name: 'Bob' });
  });

  test('sendContactMessage reports the sent status and resets the profile-update slice', async () => {
    mockedAxiosPost.mockResolvedValueOnce({} as never);
    const setStatus = jest.fn();
    const dispatch = jest.fn();

    await sendContactMessage({ name: 'Ada', email: 'ada@example.com', message: 'hi' } as never, setStatus)(dispatch);

    expect(setStatus).toHaveBeenNthCalledWith(1, { loading: true, msg: 'Your message is being sent.' });
    expect(setStatus).toHaveBeenNthCalledWith(2, { msg: 'Thank you! Your message has been sent.' });
    expect(dispatch).toHaveBeenCalledWith(userUpdateProfileActions._RESET(''));
  });

  test('sendContactMessage reports the error message when sending fails', async () => {
    mockedAxiosPost.mockRejectedValueOnce(new Error('Network down'));
    const setStatus = jest.fn();

    await sendContactMessage({ name: 'Ada', email: 'ada@example.com', message: 'hi' } as never, setStatus)(jest.fn());

    expect(setStatus).toHaveBeenNthCalledWith(2, { error: 'Network down' });
  });
});
