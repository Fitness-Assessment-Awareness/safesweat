import { EXPO_PUBLIC_BACKEND_BASE_URL } from '@env';
import axios, { AxiosError } from 'axios';

export const Network = axios.create({
    baseURL: EXPO_PUBLIC_BACKEND_BASE_URL,
    validateStatus: axios.defaults.validateStatus,
    timeout: 12000,
});

Network.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        console.log(error.toJSON());

        return Promise.reject(error);
    },
);
