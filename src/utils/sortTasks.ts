import { Task } from '../types/task.types';

export const sortTasks = (tasks: Task[], mode: 'smart' | 'deadline' | 'priority' | 'added'): Task[] => {
    const sortedTasks = [...tasks];

    if (mode === 'deadline') {
        return sortedTasks.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
    }

    if (mode === 'priority') {
        const pWeight = { high: 1, medium: 2, low: 3 };
        return sortedTasks.sort((a, b) => pWeight[a.priority] - pWeight[b.priority]);
    }

    if (mode === 'added') {
        return sortedTasks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    // SMART Sorting Algorithm
    // score = (priorityWeight * 0.4) + (deadlineWeight * 0.4) + (dateTimeWeight * 0.2)
    return sortedTasks.sort((a, b) => {
        // Completed always at bottom
        if (a.status === 'completed' && b.status !== 'completed') return 1;
        if (b.status === 'completed' && a.status !== 'completed') return -1;
        if (a.status === 'completed' && b.status === 'completed') {
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(); // Most recently completed first among completed docs
        }

        const calculateScore = (task: Task) => {
            // Priority
            const pWeight = { high: 1, medium: 2, low: 3 };
            const priorityScore = pWeight[task.priority] * 0.4;

            // Deadline (Hours remaining)
            const now = new Date().getTime();
            const deadlineTime = new Date(task.deadline).getTime();
            let hoursRemaining = (deadlineTime - now) / (1000 * 60 * 60);

            if (hoursRemaining < 0) hoursRemaining = 0;
            if (hoursRemaining > 168) hoursRemaining = 168; // Cap at 1 week
            const deadlineScore = hoursRemaining * 0.4;

            // DateTime (Hours since set)
            const dateTime = new Date(task.dateTime).getTime();
            const hoursSinceSet = Math.max(0, (now - dateTime) / (1000 * 60 * 60));
            // Invert it slightly to prioritize older tasks: lower weight means higher priority
            // e.g., if set 10 hours ago, give it some boost by reducing score
            const maxAge = 168; // capping age influence to 1 week
            const normalizedAge = Math.min(hoursSinceSet, maxAge);
            const dateTimeScore = ((maxAge - normalizedAge) / maxAge) * 10 * 0.2; // arbitrary curve 0-10

            return priorityScore + deadlineScore + dateTimeScore;
        };

        return calculateScore(a) - calculateScore(b);
    });
};
