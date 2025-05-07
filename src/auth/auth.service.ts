import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // Регистрация пользователя
  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existing) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }

    const password_hash = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        first_name: dto.first_name,
        last_name: dto.last_name,
        group_name: dto.group_name,
        password_hash,
        role: dto.role,
      },
    });

    return {
      message: 'Регистрация успешна',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        group_name: user.group_name,
      },
      // Возвращаем token также
      access_token: await this.jwtService.signAsync({
        sub: user.id,
        email: user.email,
        role: user.role,
      }),
    };
  }

  // Логирование пользователя
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user || !(await bcrypt.compare(dto.password, user.password_hash))) {
      throw new UnauthorizedException('Неверные данные');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      userId: user.id, // Добавляем ID пользователя в ответ
      group_name: user.group_name,
    };
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    const user: User | null = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    // Проверка и хеширование нового пароля
    let password_hash: string | undefined = undefined;
    if (dto.new_password) {
      if (!dto.old_password) {
        throw new BadRequestException('Не указан старый пароль');
      }

      const isOldPasswordValid = await bcrypt.compare(dto.old_password, user.password_hash);
      if (!isOldPasswordValid) {
        throw new UnauthorizedException('Старый пароль неверен');
      }

      password_hash = await bcrypt.hash(dto.new_password, 10);
    }

    // Подготавливаем данные для обновления
    const updateData: Prisma.UserUpdateInput = {
      first_name: dto.first_name,
      last_name: dto.last_name,
      email: dto.email,
      group_name: dto.group_name,
    };

    if (password_hash) {
      updateData.password_hash = password_hash;
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateData,
    });

    return {
      message: 'Профиль обновлён',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        group_name: updatedUser.group_name,
      },
    };
  }

  // Удаление пользователя
  async deleteUser(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    await this.prisma.user.delete({
      where: { id: userId },
    });

    return { message: 'Пользователь удалён' };
  }

  // Получить всех пользователей
  async getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        role: true,
      },
    });
  }

  // Получить конкретного пользователя по ID
  async getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        role: true,
      },
    });
  }
}
