import axios from "axios";
import { clearToken, getToken } from "./helper";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
});

axiosInstance.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

axiosInstance.interceptors.request.use(function (config) {
    const token = getToken();
    if (token) {
        config.headers.Authorization = token ? `Bearer ${token}` : "";
    }
    return config;
});

axiosInstance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        if(error.response.status == 401){
            clearToken();
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;