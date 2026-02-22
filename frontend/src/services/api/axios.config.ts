import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@/constants/config';
import { useAuthStore } from '@/store/auth.store';
import { useUIStore } from '@/store/ui.store';

export const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 60000, // 60 seconds timeout to handle free-tier slow cold starts
    headers: {
        'Content-Type': 'application/json',
    },
});

let activeRequests = 0;

api.interceptors.request.use(
    async (config) => {
        activeRequests++;
        useUIStore.getState().setGlobalLoading(true);

        const token = await AsyncStorage.getItem('userToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        activeRequests--;
        if (activeRequests <= 0) {
            activeRequests = 0;
            useUIStore.getState().setGlobalLoading(false);
        }
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        activeRequests--;
        if (activeRequests <= 0) {
            activeRequests = 0;
            useUIStore.getState().setGlobalLoading(false);
        }
        return response;
    },
    async (error) => {
        activeRequests--;
        if (activeRequests <= 0) {
            activeRequests = 0;
            useUIStore.getState().setGlobalLoading(false);
        }

        // Implement token expiration logic
        if (error.response?.status === 401) {
            // Clear auth store immediately to prompt login
            useAuthStore.getState().logout();
        }

        const message = error.response?.data?.message || 'An unexpected error occurred';
        useUIStore.getState().showToast(message, 'error');

        return Promise.reject(error);
    }
);
