import axios from "axios";
import { logoutUser } from "../context/service/authService";

const token = localStorage.getItem("token")
// axios
const authFetch = axios.create({
  baseURL: "http://localhost:8080/",
});
// request

authFetch.interceptors.request.use(
  (config) => {
    config.headers.common["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// response

authFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      logoutUser();
    }
    return Promise.reject(error);
  }
);

export default authFetch
