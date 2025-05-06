import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    try {
      await this.$connect(); // Устанавливаем подключение при старте модуля
      console.log('Prisma connected');
    } catch (error) {
      console.error('Prisma connection failed:', error);
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect(); // Закрываем подключение при завершении работы модуля
      console.log('Prisma disconnected');
    } catch (error) {
      console.error('Error disconnecting Prisma:', error);
    }
  }
}
