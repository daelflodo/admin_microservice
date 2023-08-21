import { Module } from '@nestjs/common';
import { TasksService } from './services/tasks.service';
import { TasksController } from './controllers/tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/tasks.entity';
import { UserRepository } from '../users/users.repository';
// import { UsersModule } from '../users/users.module';
import { User } from '../users/entities/users.entity';
@Module({
  // imports: [TypeOrmModule.forFeature([Task, UserRepository])], //!revisar
  imports: [TypeOrmModule.forFeature([Task, User])], //!revisar
  providers: [TasksService, UserRepository],
  controllers: [TasksController],
})
export class TasksModule {}
