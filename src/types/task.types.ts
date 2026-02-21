export type Priority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'completed';

export interface Task {
    _id: string;
    userId: string;
    title: string;
    description?: string;
    dateTime: string;        // ISO string
    deadline: string;        // ISO string
    priority: Priority;
    status: TaskStatus;
    category?: string;
    createdAt: string;
    updatedAt: string;
}
