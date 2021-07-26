import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  mode: 'cors'
});

const axiosRedux =
  (authorization, requestPayload) =>
  (
    dispatchRequest,
    dispatchSuccess = dispatchRequest,
    dispatchFail = dispatchSuccess
  ) =>
  (ActionDispatchBySuccess, extHandlerBySuccess, selector = (data) => data) =>
  (method, url, data) =>
  async (dispatch, getState) => {
    const headers = {};
    if (authorization) {
      const {
        userSignin: { userInfo }
      } = getState();
      headers.Authorization = `Bearer ${userInfo.token}`;
    }

    dispatch(dispatchRequest._REQUEST(requestPayload));

    try {
      const { data: returnedData } = await axios({
        method,
        data,
        headers,
        url: process.env.REACT_APP_BACKEND_URL + url,
        mode: 'cors'
      });

      dispatch(dispatchSuccess._SUCCESS(selector(returnedData)));
      if (ActionDispatchBySuccess)
        dispatch(ActionDispatchBySuccess(returnedData));
      if (extHandlerBySuccess) extHandlerBySuccess(returnedData);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      dispatch(dispatchFail._FAIL(message));
    }
  };

const axiosPublic = (requestPayload) => axiosRedux(false, requestPayload);
const axiosPrivate = (requestPayload) => axiosRedux(true, requestPayload);

export default axiosClient;
export { axios, axiosPublic, axiosPrivate };
