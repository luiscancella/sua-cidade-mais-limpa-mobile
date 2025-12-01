import axios from "axios";

const API_CONFIG = {
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    timeout: 5000,
    headers: {
        Accept: 'application/json',
    }
}

const apiBackend = axios.create(API_CONFIG);

apiBackend.interceptors.request.use(
    config => {
        console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
        console.log("Params:", config.params);
        console.log("Data:", config.data);
        return config;
    }
);

apiBackend.interceptors.response.use(
    response => {
        console.log(`[SUCESSO] API Response: ${response.status} ${response.config.url}`);
        console.log("Data:", response.data);
        return response;
    },
    error => {
        console.log(JSON.stringify(error.response?.data, null, 2));
        return Promise.reject(error);
    }
);

export default apiBackend;