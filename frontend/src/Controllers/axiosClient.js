import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://amazin-be.herokuapp.com",
  mode: "cors",
});

export default axiosClient;
export { axios };
