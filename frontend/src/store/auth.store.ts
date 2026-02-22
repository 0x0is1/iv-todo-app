import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types/user.types';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    isReady: boolean;
    login: (user: User, token: string) => Promise<void>;
    register: (user: User, token: string) => Promise<void>;
    logout: () => Promise<void>;
    restoreSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    isReady: false,

    login: async (user, token) => {
        set({ isLoading: true });
        try {
            await AsyncStorage.setItem('userToken', token);
            await AsyncStorage.setItem('userData', JSON.stringify(user));
            set({ user: { ...user, token }, isAuthenticated: true });
        } finally {
            set({ isLoading: false });
        }
    },

    register: async (user, token) => {
        set({ isLoading: true });
        try {
            await AsyncStorage.setItem('userToken', token);
            await AsyncStorage.setItem('userData', JSON.stringify(user));
            set({ user: { ...user, token }, isAuthenticated: true });
        } finally {
            set({ isLoading: false });
        }
    },

    logout: async () => {
        set({ isLoading: true });
        try {
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userData');
            set({ user: null, isAuthenticated: false });
        } finally {
            set({ isLoading: false });
        }
    },

    restoreSession: async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const userData = await AsyncStorage.getItem('userData');

            if (token && userData) {
                set({ user: { ...JSON.parse(userData), token }, isAuthenticated: true });
            } else {
                set({ user: null, isAuthenticated: false });
            }
        } catch (e) {
            set({ user: null, isAuthenticated: false });
        } finally {
            set({ isReady: true });
        }
    },
}));
