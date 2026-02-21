import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) { }

    async create(userId: string, createTaskDto: CreateTaskDto): Promise<Task> {
        const createdTask = new this.taskModel({
            ...createTaskDto,
            user: userId,
        });
        return createdTask.save();
    }

    async findAllForUser(userId: string, query?: any): Promise<any> {
        const { page = 1, limit = 10, sort, filter, search } = query || {};
        const skip = (Math.max(1, Number(page)) - 1) * Number(limit);
        const queryObj: any = { user: userId as any };

        if (filter) {
            const [key, value] = typeof filter === 'string' ? filter.split(':') : [];
            if (key && value) {
                queryObj[key] = value;
            }
        }

        if (search) {
            queryObj.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        let sortObj: any = { createdAt: -1 };
        if (sort) {
            const [key, order] = typeof sort === 'string' ? sort.split(':') : [];
            if (key) {
                sortObj[key] = order === 'asc' ? 1 : -1;
            }
        }

        const tasks = await this.taskModel.find(queryObj)
            .sort(sortObj)
            .skip(skip)
            .limit(Number(limit))
            .exec();

        const total = await this.taskModel.countDocuments(queryObj);

        return {
            tasks,
            total,
            page: Number(page),
            pages: Math.ceil(total / Number(limit)),
            sorted: !!sort,
            filtered: !!filter,
            searched: !!search
        };
    }

    async update(userId: string, taskId: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
        const updatedTask = await this.taskModel
            .findOneAndUpdate({ _id: taskId, user: userId as any }, updateTaskDto, { new: true })
            .exec();

        if (!updatedTask) {
            throw new NotFoundException(`Task #${taskId} not found`);
        }
        return updatedTask;
    }

    async remove(userId: string, taskId: string): Promise<void> {
        const result = await this.taskModel.deleteOne({ _id: taskId, user: userId as any }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException(`Task #${taskId} not found`);
        }
    }

    async toggleComplete(userId: string, taskId: string): Promise<Task> {
        const task = await this.taskModel.findOne({ _id: taskId, user: userId as any }).exec();
        if (!task) {
            throw new NotFoundException(`Task #${taskId} not found`);
        }

        task.status = task.status === 'completed' ? 'pending' : 'completed';
        return task.save();
    }
}
