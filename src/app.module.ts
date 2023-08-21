import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Enviroments } from './enviroments';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import * as joi from 'joi';
import { User } from './users/entities/users.entity';
import { UserRepository } from './users/users.repository';
// import { SharedModule } from './shared.module';
import { GatewayModule } from './gateway/gateway.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1489',
      database: 'db_gestion',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      // migrationsRun: false,
    }),
    ConfigModule.forRoot({
      envFilePath: Enviroments[process.env.NODE_ENV] || '.env',
      isGlobal: true,
      validationSchema: joi.object({
        PORT: joi.number().required(),
      }),
    }),
    UsersModule,
    TasksModule,
    GatewayModule,
    TypeOrmModule.forFeature([User, UserRepository]),
    AuthModule,
    // SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
