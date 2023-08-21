import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Task System')
    .setDescription('Task Management System')
    .setVersion('1.0')
    .addTag('users')
    .addTag('tasks')
    .addTag('auth')
    .addTag('gateway')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);
  app.enableCors();
  await app.listen(PORT, '0.0.0.0', () => {
    console.log(`Listening in port: ${PORT}`);
  });
}
bootstrap();
