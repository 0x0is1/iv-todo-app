import { api } from './axios.config';
import { Task } from '../../types/task.types';

export const tasksApi = {
    fetchTasks: async (params?: any): Promise<Task[]> => {
        const response = await api.get('/tasks', { params });
        // Handle paginated responses from backend wrapper if needed.
        return response.data.tasks || response.data;
    },

    createTask: async (taskData: Partial<Task>): Promise<Task> => {
        const response = await api.post('/tasks', taskData);
        return response.data;
    },

    updateTask: async (taskId: string, taskData: Partial<Task>): Promise<Task> => {
        const response = await api.patch(`/tasks/${taskId}`, taskData);
        return response.data;
    },

    deleteTask: async (taskId: string): Promise<void> => {
        await api.delete(`/tasks/${taskId}`);
    },

    toggleComplete: async (taskId: string): Promise<Task> => {
        const response = await api.patch(`/tasks/${taskId}/complete`);
        return response.data;
    }
};
