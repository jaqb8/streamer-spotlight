import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.defaults.headers.common["Content-Type"] = "application/json";

const token = localStorage.getItem("accessToken");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
