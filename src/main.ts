import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Включаем глобальную валидацию
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: '*', // Здесь указываем домены, которые могут делать запросы к вашему серверу
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Разрешённые HTTP методы
    allowedHeaders: 'Content-Type, Accept', // Разрешённые заголовки
  });

  // Логирование при старте сервера
  const logger = new Logger('Bootstrap');
  await app.listen(3000);

  // Логируем сообщение о запуске сервера
  logger.log('Server is running on http://localhost:3000');
}
bootstrap();
