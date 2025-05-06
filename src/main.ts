import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Включаем глобальную валидацию
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: 'http://baze36.ru', // Указываем фронтенд домен или localhost, если вы работаете локально
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Указываем необходимые заголовки
  });

  // Логирование при старте сервера
  const logger = new Logger('Bootstrap');
  await app.listen(3000);

  // Логируем сообщение о запуске сервера
  logger.log('Server is running on http://localhost:3000');
}
bootstrap();
