import Axios from "axios";
import { toast } from "react-toastify";

// We make an 'instance' of it
const instance = Axios.create({
  // .. where we make our configurations
  baseURL: process.env.REACT_APP_BASE_URL,
});

instance.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    toast.error("Something unexpected happened !");
  }
  return Promise.reject(error);
});

export default instance;
