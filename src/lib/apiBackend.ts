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
    response => {
        console.log('Codigo da Resposta:', response.status);
        console.log('Dados da Resposta:', response.data);
        return response;
    },
    error => {
        if (error.response) {
            console.error('Erro na Resposta:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('Nenhuma Resposta Recebida:', error.request);
        } else {
            console.error('Erro na Configuração da Requisição:', error.message);
        }
        return Promise.reject(error);
    }
);

apiBackend.interceptors.request.use(
    request => {
        console.log(process.env.EXPO_PUBLIC_API_URL);
        console.log('Iniciando Requisição para:', request.url);
        console.log('Parâmetros da Requisição:', request.params);
        console.log("Body");
        console.log(JSON.stringify(request.data, null, 2));
        return request;
    },
    error => {
        console.error('Erro na Requisição:', error.message);
        return Promise.reject(error);
    }
);

export default apiBackend;