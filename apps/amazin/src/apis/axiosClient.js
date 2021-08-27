import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  mode: 'cors'
});

const axiosRedux =
  (authorization) =>
  (
    [
      onRequestDispatcher,
      onSuccessDispatcher = onRequestDispatcher,
      onFailDispatcher = onSuccessDispatcher
    ],
    { req = null, extDispatch, extHandler, selector = (d) => d } = {}
  ) =>
  (method = 'get', url = '', reqData = null) =>
  async (dispatch, getState) => {
    const headers = {};
    if (authorization) {
      const {
        userSignin: { userInfo }
      } = getState();
      headers.Authorization = `Bearer ${userInfo.token}`;
    }
    dispatch(onRequestDispatcher._REQUEST(req));

    try {
      const { data } = await axios({
        method,
        headers,
        data: reqData,
        url: process.env.REACT_APP_BACKEND_URL + url,
        mode: 'cors'
      });

      dispatch(onSuccessDispatcher._SUCCESS(selector(data)));
      if (extDispatch) dispatch(extDispatch(data));
      if (extHandler) extHandler(data);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      dispatch(onFailDispatcher._FAIL(message));
    }
  };

const axiosPublic = axiosRedux(false);
const axiosPrivate = axiosRedux(true);

export default axiosClient;
export { axios, axiosPublic, axiosPrivate };
