import { api } from '@/services/api/axios.config';
import { User } from '@/types/user.types';

export const authApi = {
    login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    },

    register: async (name: string, email: string, password: string): Promise<{ user: User; token: string }> => {
        const response = await api.post('/auth/register', { name, email, password });
        return response.data;
    },
};
