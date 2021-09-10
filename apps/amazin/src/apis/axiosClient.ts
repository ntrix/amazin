import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  mode: 'cors'
});

const getTokenHeader = (getState) => ({ Authorization: `Bearer ${getState()?.userSignin?.userInfo?.token}` });

const axiosRedux =
  (authorization: boolean | undefined) =>
  (
    [action, actionBySuccess = action, actionByFail = actionBySuccess],
    { successAction, successHandler, selector = (d) => d }: { any; any; any } = {}
  ) =>
  (method = 'get', url = '', requestData = null) =>
  async (dispatch, getState) => {
    const headers = authorization && getTokenHeader(getState);
    url = process.env.REACT_APP_BACKEND_URL + url;

    dispatch(action._REQUEST());

    try {
      const { data } = await axios({ method, headers, url, data: requestData, mode: 'cors' });
      // HTML response with Error?
      if (typeof data === 'string' && data.startsWith('<!')) throw new Error("Couldn't access Database Server!");

      dispatch(actionBySuccess._SUCCESS(selector(data)));
      if (successAction) dispatch(successAction(data));
      if (successHandler) successHandler(data);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      dispatch(actionByFail._FAIL(message));
    }
  };

const axiosPublic = axiosRedux();
const axiosPrivate = axiosRedux(true);

export default axiosClient;
export { axios, axiosPublic, axiosPrivate };
