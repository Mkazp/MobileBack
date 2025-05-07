import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express'; // Импортируем тип запроса

// Интерфейс для описания пользователя (по типу данных из JwtStrategy)
export interface User {
  id: number;
  email: string;
  role: string;
  group_name: string;
}

// Декоратор для получения текущего пользователя из контекста запроса
export const GetUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>(); // Типизируем request как Request
  return request.user; // Возвращаем пользователя, который был добавлен в request в JwtStrategy
});
