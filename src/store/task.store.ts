import { create } from 'zustand';
import { Task, Priority, TaskStatus } from '../types/task.types';

interface TaskState {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;
    fetchTasks: () => Promise<void>;
    activeFilter: {
        status: 'all' | TaskStatus;
        priority: 'all' | Priority;
        category: string; // 'all' or specific string
    };
    activeSortMode: 'smart' | 'deadline' | 'priority' | 'added';

    setTasks: (tasks: Task[]) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    setFilter: (filter: Partial<TaskState['activeFilter']>) => void;
    setSortMode: (mode: TaskState['activeSortMode']) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
    tasks: [],
    isLoading: false,
    error: null,
    activeFilter: {
        status: 'all',
        priority: 'all',
        category: 'all',
    },
    activeSortMode: 'smart',

    setTasks: (tasks) => set({ tasks }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    setFilter: (filter) => set((state) => ({ activeFilter: { ...state.activeFilter, ...filter } })),
    setSortMode: (mode) => set({ activeSortMode: mode }),
    fetchTasks: async () => {
        set({ isLoading: true });
        try {
            const { tasksApi } = await import('../services/api/tasks.api');
            const data = await tasksApi.fetchTasks();
            set({ tasks: data, error: null });
        } catch (e) {
            set({ error: 'Failed to fetch tasks' });
        } finally {
            set({ isLoading: false });
        }
    },
}));
