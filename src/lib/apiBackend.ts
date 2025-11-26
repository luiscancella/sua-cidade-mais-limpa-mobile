import axios from "axios";

const API_CONFIG = {
    baseURL: process.env.API_BASE_URL || 'http://localhost:8000',
    timeout: 5000,
    headers: {
        Accept: 'application/json',
    }
}

const apiBackend = axios.create(API_CONFIG);

export default apiBackend;