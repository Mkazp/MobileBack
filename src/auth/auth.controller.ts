import { Body, Controller, Post, Get, UseGuards, Delete } from '@nestjs/common'; // Добавлен импорт UseGuards и Get
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard'; // Импортируем JwtAuthGuard
// import { GetUser, User } from './get-user.decorator';
import { Param } from '@nestjs/common';

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

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllUsers() {
    return this.authService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.authService.getUserById(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteUserById(@Param('id') id: number) {
    return this.authService.deleteUser(Number(id));
  }
}
