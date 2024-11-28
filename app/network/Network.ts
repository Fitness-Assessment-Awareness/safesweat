import { EXPO_PUBLIC_BACKEND_BASE_URL } from '@env';
import axios from 'axios';

export const Network = axios.create({
    baseURL: EXPO_PUBLIC_BACKEND_BASE_URL,
    validateStatus: axios.defaults.validateStatus,
    timeout: 12000,
});

Network.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error('Error Response:', {
                status: error.response.status,
                headers: error.response.headers,
                data: error.response.data,
            });
        } else if (error.request) {
            console.error('Error Request:', {
                request: error.request,
            });
        } else {
            console.error('Error Message:', error.message);
        }

        console.error('Error Config:', {
            config: error.config,
        });

        return Promise.reject(error);
    },
);
