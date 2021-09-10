import axios, { Method } from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: { mode: 'cors' }
});

const getTokenHeader = (getState) => ({
  Authorization: `Bearer ${getState()?.userSignin?.userInfo?.token}`,
  mode: 'cors'
});

type fnType = (d?: unknown) => unknown;
type optFn = fnType | undefined;
interface OptionFns {
  successAction?: optFn;
  successHandler?: optFn;
  selector?: optFn;
}

const axiosRedux =
  (authorization: true | undefined) =>
  (
    [action, actionBySuccess = action, actionByFail = actionBySuccess]: any[],
    { successAction, successHandler, selector = (d) => d }: OptionFns = {}
  ) =>
  (method: Method | undefined = 'get', url = '', requestData = null) =>
  async (dispatch, getState) => {
    const headers = authorization && getTokenHeader(getState);
    url = process.env.REACT_APP_BACKEND_URL + url;

    dispatch(action._REQUEST());

    try {
      const { data } = await axios(url, { method, headers, data: requestData });
      // HTML response with Error?
      if (typeof data === 'string' && data.startsWith('<!')) throw new Error("Couldn't access Database Server!");

      dispatch(actionBySuccess._SUCCESS(selector(data)));
      if (successAction) dispatch(successAction(data));
      if (successHandler) successHandler(data);
    } catch (error: any) {
      const message: string = error.response?.data?.message || error.message;
      dispatch(actionByFail._FAIL(message));
    }
  };

const axiosPublic = axiosRedux(undefined);
const axiosPrivate = axiosRedux(true);

export default axiosClient;
export { axios, axiosPublic, axiosPrivate };
