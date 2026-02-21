import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import type { Priority, TaskStatus } from '../task.schema';

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsNotEmpty()
    dateTime: string;

    @IsString()
    @IsNotEmpty()
    deadline: string;

    @IsEnum(['low', 'medium', 'high'])
    priority: Priority;

    @IsString()
    @IsOptional()
    category?: string;

    @IsEnum(['pending', 'completed'])
    @IsOptional()
    status?: TaskStatus;
}

export class UpdateTaskDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    dateTime?: string;

    @IsString()
    @IsOptional()
    deadline?: string;

    @IsEnum(['low', 'medium', 'high'])
    @IsOptional()
    priority?: Priority;

    @IsString()
    @IsOptional()
    category?: string;

    @IsEnum(['pending', 'completed'])
    @IsOptional()
    status?: TaskStatus;
}
