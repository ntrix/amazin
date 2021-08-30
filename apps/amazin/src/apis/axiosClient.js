import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  mode: 'cors'
});

const axiosRedux =
  (authorization) =>
  (
    [onRequestDispatcher, onSuccessDispatcher = onRequestDispatcher, onFailDispatcher = onSuccessDispatcher],
    { requestPayload = null, successDispatcher, successHandler, selector = (d) => d } = {}
  ) =>
  (method = 'get', url = '', requestData = null) =>
  async (dispatch, getState) => {
    const headers = {};
    if (authorization) {
      const {
        userSignin: { userInfo }
      } = getState();
      headers.Authorization = `Bearer ${userInfo.token}`;
    }
    dispatch(onRequestDispatcher._REQUEST(requestPayload));

    try {
      const { data } = await axios({
        method,
        headers,
        data: requestData,
        url: process.env.REACT_APP_BACKEND_URL + url,
        mode: 'cors'
      });
      // HTML response with Error?
      if (typeof data === 'string' && data.startsWith('<!')) throw new Error("Couldn't access Database Server!");

      dispatch(onSuccessDispatcher._SUCCESS(selector(data)));
      if (successDispatcher) dispatch(successDispatcher(data));
      if (successHandler) successHandler(data);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      dispatch(onFailDispatcher._FAIL(message));
    }
  };

const axiosPublic = axiosRedux(false);
const axiosPrivate = axiosRedux(true);

export default axiosClient;
export { axios, axiosPublic, axiosPrivate };
