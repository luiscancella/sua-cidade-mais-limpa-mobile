import axios from "axios";

const API_CONFIG = {
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    timeout: 5000,
    headers: {
        Accept: 'application/json',
    }
}

const apiBackend = axios.create(API_CONFIG);

apiBackend.interceptors.response.use(
    response => response,
    error => {
        console.error("API Error:", error.response?.status, error.response?.data || error.message);
        return Promise.reject(error);
    }
);

apiBackend.interceptors.request.use(
    config => {
        console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
        console.log("Request Data:", config.data);
        console.log("Request Params:", config.params);
        return config;
    }
);

export default apiBackend;