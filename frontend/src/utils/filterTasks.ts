import { Task } from '@/types/task.types';

export const filterTasks = (tasks: Task[], activeFilter: any) => {
    return tasks.filter((task) => {
        // By Status
        if (activeFilter.status !== 'all' && task.status !== activeFilter.status) {
            return false;
        }

        // By Priority
        if (activeFilter.priority !== 'all' && task.priority !== activeFilter.priority) {
            return false;
        }

        // By Category
        if (activeFilter.category !== 'all' && task.category !== activeFilter.category) {
            return false;
        }

        return true;
    });
};
