import { z } from 'zod';

export const taskSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
    description: z.string().max(500, 'Description is too long').optional(),
    dateTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    }),
    deadline: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid deadline format",
    }),
    priority: z.enum(['low', 'medium', 'high']),
    category: z.string().max(50, 'Category is too long').optional(),
}).refine((data) => {
    const dt = new Date(data.dateTime).getTime();
    const dl = new Date(data.deadline).getTime();
    return dl > dt;
}, {
    message: "Deadline must be after Task Date & Time",
    path: ["deadline"],
});
