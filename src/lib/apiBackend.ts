import axios, { AxiosError } from "axios";

const API_CONFIG = {
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    timeout: 5000,
    headers: {
        Accept: 'application/json',
    }
}

const apiBackend = axios.create(API_CONFIG);

// const buildFullUrl = (baseURL?: string, url?: string) => {
//     if (!url) return baseURL || "";

//     try {
//         return new URL(url, baseURL).toString();
//     } catch {
//         return `${baseURL || ""}${url}`;
//     }
// };

// const getEndpoint = (fullUrl: string) => {
//     try {
//         return new URL(fullUrl).pathname;
//     } catch {
//         return fullUrl;
//     }
// };

// apiBackend.interceptors.request.use((config) => {
//     const fullUrl = buildFullUrl(config.baseURL, config.url);

//     console.log("[API REQUEST]", {
//         method: config.method,
//         url: fullUrl,
//         endpoint: getEndpoint(fullUrl),
//         body: config.data ?? null,
//         headers: config.headers ?? null,
//     });

//     return config;
// }, (error) => {
//     console.error("[API REQUEST ERROR]", error);
//     return Promise.reject(error);
// });

// apiBackend.interceptors.response.use(
//     (response) => {
//         const fullUrl = buildFullUrl(response.config?.baseURL, response.config?.url);

//         console.log("[API RESPONSE]", {
//             code: response.status,
//             body: response.data ?? null,
//             url: fullUrl,
//             endpoint: getEndpoint(fullUrl),
//         });

//         return response;
//     },
//     (error: AxiosError) => {
//         const fullUrl = buildFullUrl(error.config?.baseURL, error.config?.url);

//         console.error("[API ERROR]", {
//             code: error.response?.status ?? null,
//             body: error.response?.data ?? null,
//             url: fullUrl,
//             endpoint: getEndpoint(fullUrl),
//         });

//         return Promise.reject(error);
//     }
// );

export default apiBackend;