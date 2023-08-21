import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { CreateTasksDtos, UpdateTasksDto } from '../dtos/tasks.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Post()
  createTask(@Body() Data: CreateTasksDtos) {
    return this.tasksService.createTasks(Data);
  }

  @Get()
  getTasks() {
    return this.tasksService.getTasks();
  }

  @Get(':id')
  getTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.getTask(id);
  }

  @Put(':id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() Data: UpdateTasksDto,
  ) {
    return this.tasksService.updateTask(id, Data);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Body('userId') userId: number,
  ) {
    return this.tasksService.remove(id, userId);
  }
}
