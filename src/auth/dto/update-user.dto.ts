import { IsOptional, IsString, IsEmail, IsEnum } from 'class-validator';
import { Role } from '@prisma/client'; // Импортируем Role из Prisma

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsString()
  group_name?: string;

  @IsOptional()
  @IsString()
  old_password?: string;

  @IsOptional()
  @IsString()
  new_password?: string;

  @IsOptional()
  @IsEnum(Role) // Проверка на валидность роли
  role?: Role;
}
