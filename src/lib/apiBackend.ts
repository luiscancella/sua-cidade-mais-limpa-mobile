import axios from "axios";

const API_CONFIG = {
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    timeout: 5000,
    headers: {
        Accept: 'application/json',
    }
}

const apiBackend = axios.create(API_CONFIG);

export default apiBackend;