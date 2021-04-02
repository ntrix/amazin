import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  mode: "cors",
});

export default axiosClient;
export { axios };
