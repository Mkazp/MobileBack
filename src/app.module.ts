import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SubjectModule } from './subject/subject.module';
import { CardModule } from './card/card.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    AuthModule,
    SubjectModule,
    CardModule,
  ],
})
export class AppModule {
  constructor() {
    console.log('JWT_SECRET: ', process.env.JWT_SECRET); // Убедитесь, что переменная доступна
  }
}
