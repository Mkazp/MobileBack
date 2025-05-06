import { Body, Controller, Post, Get, UseGuards, Delete } from '@nestjs/common'; // Добавлен импорт UseGuards и Get
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard'; // Импортируем JwtAuthGuard
import { GetUser, User } from './get-user.decorator'; // Импортируем декоратор GetUser и интерфейс User

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard) // Используем JwtAuthGuard для защиты маршрута
  @Get('me') // Используем Get для создания маршрута GET /auth/me
  getMe(@GetUser() user: User) {
    // Типизируем user как User
    return user; // Возвращаем пользователя, который был извлечён из токена
  }

  @UseGuards(JwtAuthGuard) // Защищаем маршрут
  @Delete('me') // Метод для удаления текущего пользователя
  async deleteMe(@GetUser() user: User) {
    return this.authService.deleteUser(user.id); // Вызываем метод удаления пользователя
  }
}
