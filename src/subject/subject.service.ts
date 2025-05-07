import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSubjectDto } from './dto/create-subject.dto';

@Injectable()
export class SubjectService {
  constructor(private prisma: PrismaService) {}

  // Метод для создания предмета
  async create(dto: CreateSubjectDto) {
    return this.prisma.subject.create({
      data: {
        name: dto.name,
        subject_type: dto.subject_type,
        // Создание связей с группами через таблицу SubjectGroup
        subjectGroups: {
          create: dto.groupNames.map(groupName => ({
            groupName,
          })),
        },
      },
    });
  }

  // Метод для получения предметов, связанных с группой пользователя
  async findByUserGroup(groupName: string) {
    return this.prisma.subject.findMany({
      where: {
        subjectGroups: {
          some: {
            groupName,
          },
        },
      },
      include: {
        cards: true, // Включаем карточки в результат
      },
    });
  }

  async deleteById(subjectId: number) {
    return this.prisma.subject.delete({
      where: { id: subjectId },
    });
  }
}
