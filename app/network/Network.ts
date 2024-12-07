import { EXPO_PUBLIC_BACKEND_BASE_URL } from '@env';
import axios from 'axios';

export const Network = axios.create({
    baseURL: EXPO_PUBLIC_BACKEND_BASE_URL,
    validateStatus: axios.defaults.validateStatus,
    timeout: 12000,
});
