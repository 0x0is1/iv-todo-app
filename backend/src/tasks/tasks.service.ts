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

    async findAllForUser(userId: string): Promise<Task[]> {
        return this.taskModel.find({ user: userId as any }).exec();
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
