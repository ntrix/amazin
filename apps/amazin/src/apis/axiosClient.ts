import axios, { Method } from 'axios';
import store from 'src/store';
import { userSigninActions } from 'src/slice/UserSlice';
import { Storage } from 'src/utils';
import { KEY } from 'src/constants';

// so the browser sends the httpOnly refresh-token cookie cross-origin (FE and
// BE are on different domains) to every request, not just the refresh call
axios.defaults.withCredentials = true;

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: { mode: 'cors' },
  withCredentials: true,
});

const getTokenHeader = (authorization: boolean, getState: FnType) =>
  !authorization
    ? undefined
    : {
        Authorization: `Bearer ${getState()?.userSignin?.userInfo?.token}`,
        mode: 'cors',
      };

const checkDBError = (data: unknown) => {
  // HTML response with Error?
  if (typeof data === 'string' && data.startsWith('<!')) throw new Error("Couldn't access Database Server!");
};

const getErrorMsg = (error?: ErrorType) => error?.response?.data?.message ?? error?.message;

const REFRESH_URL = '/api/users/refresh';
const AUTH_URLS_NOT_TO_RETRY = ['/api/users/signin', '/api/users/register', REFRESH_URL];

function forceSignOut() {
  Storage[KEY.USER_INFO] = '';
  store.dispatch(userSigninActions._RESET(''));
  document.location.href = '/signin';
}

// concurrent 401s (e.g. several API calls in flight at once) share one
// in-flight refresh instead of each rotating the refresh cookie themselves
let refreshPromise: Promise<string | null> | null = null;

function refreshAccessToken(): Promise<string | null> {
  if (!refreshPromise) {
    refreshPromise = axios
      .post(process.env.REACT_APP_BACKEND_URL + REFRESH_URL, null, { withCredentials: true })
      .then(({ data }: { data: { token: string } }) => {
        const userInfo = store.getState().userSignin?.userInfo;
        const updated = { ...userInfo, token: data.token };
        Storage[KEY.USER_INFO] = updated;
        store.dispatch(userSigninActions._SUCCESS(updated));
        return data.token;
      })
      .catch(() => {
        forceSignOut();
        return null;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

// an expired 15-minute access token shouldn't force a re-login - silently
// refresh once via the httpOnly cookie and retry the request that 401'd
axios.interceptors.response.use(
  (response) => response,
  async (error: ErrorType) => {
    const config = error?.config as (typeof error.config & { _retry?: boolean }) | undefined;
    const isAuthEndpoint = AUTH_URLS_NOT_TO_RETRY.some((url) => config?.url?.includes(url));

    if (error?.response?.status === 401 && config && !config._retry && !isAuthEndpoint) {
      config._retry = true;
      const newToken = await refreshAccessToken();
      if (newToken) {
        config.headers = { ...config.headers, Authorization: `Bearer ${newToken}` };
        return axios(config);
      }
    }
    return Promise.reject(error);
  }
);

const axiosRedux =
  (authorization: boolean) =>
  (
    [action, actionBySuccess = action, actionByFail = actionBySuccess]: SliceAction[],
    { successAction, successHandler, selector = (d) => d }: OptionFns = {}
  ) =>
  (method: Method | undefined = 'get', url = '', requestData?: unknown) =>
  async (dispatch: AppDispatch, getState: FnType) => {
    const headers = getTokenHeader(authorization, getState);
    url = process.env.REACT_APP_BACKEND_URL + url;

    dispatch(action._REQUEST());

    try {
      const { data } = await axios(url, { method, headers, data: requestData });

      checkDBError(data);
      dispatch(actionBySuccess._SUCCESS(selector(data)));
      if (successAction) dispatch(successAction(data));
      if (successHandler) successHandler(data);
    } catch (error) {
      dispatch(actionByFail._FAIL(getErrorMsg(error)));
    }
  };

const axiosPublic = axiosRedux(false);
const axiosPrivate = axiosRedux(true);

export default axiosClient;
export { axios, axiosPublic, axiosPrivate, refreshAccessToken };
