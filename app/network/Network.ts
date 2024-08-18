import { EXPO_PUBLIC_LOCAL_IP_ADDR } from '@env';
import axios from 'axios';

const getLocalIpAddr = () => EXPO_PUBLIC_LOCAL_IP_ADDR;

export const Network = axios.create({
    baseURL: `http://${getLocalIpAddr()}:8080`,
    validateStatus: axios.defaults.validateStatus,
    timeout: 12000,
});

Network.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('An error occurred: ', error.message);
        return Promise.reject(error);
    },
);
