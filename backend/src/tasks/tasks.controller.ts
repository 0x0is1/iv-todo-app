import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post()
    create(@GetUser() user: any, @Body() createTaskDto: CreateTaskDto) {
        return this.tasksService.create(user.userId, createTaskDto);
    }

    @Get()
    findAll(@GetUser() user: any, @Query() query: any) {
        return this.tasksService.findAllForUser(user.userId, query);
    }

    @Put(':id')
    update(
        @GetUser() user: any,
        @Param('id') id: string,
        @Body() updateTaskDto: UpdateTaskDto,
    ) {
        return this.tasksService.update(user.userId, id, updateTaskDto);
    }

    @Delete(':id')
    remove(@GetUser() user: any, @Param('id') id: string) {
        return this.tasksService.remove(user.userId, id);
    }

    @Patch(':id/toggle')
    toggleComplete(@GetUser() user: any, @Param('id') id: string) {
        return this.tasksService.toggleComplete(user.userId, id);
    }
}
