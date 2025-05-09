import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
@Injectable()
export class SubjectService {
  constructor(private prisma: PrismaService) {}

  // Метод для создания предмета
  async create(dto: CreateSubjectDto) {
    return this.prisma.subject.create({
      data: {
        name: dto.name,
        subject_type: dto.subject_type,
        subjectGroups: {
          create: dto.groupNames.map(groupName => ({
            groupName,
          })),
        },
      },
      include: {
        subjectGroups: true, // <-- добавляем включение связей
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

  // subject.service.ts
  async findAll() {
    return this.prisma.subject.findMany({
      include: {
        subjectGroups: true,
        cards: true, // если нужно
      },
    });
  }

  async deleteById(subjectId: number) {
    // Удалить все карточки, связанные с предметом
    await this.prisma.card.deleteMany({
      where: { subject_id: subjectId },
    });

    // Удалить связи с группами
    await this.prisma.subjectGroup.deleteMany({
      where: { subjectId },
    });

    // Удалить из избранного у всех пользователей
    await this.prisma.userFavoriteSubject.deleteMany({
      where: { subject_id: subjectId },
    });

    // Удалить сам предмет
    return this.prisma.subject.delete({
      where: { id: subjectId },
    });
  }

  // Добавление предмета в избранное
  async addToFavorites(userId: number, subjectId: number) {
    return this.prisma.userFavoriteSubject.create({
      data: {
        user_id: userId,
        subject_id: subjectId,
      },
    });
  }

  // Получение избранных предметов пользователя
  async getFavoriteSubjects(userId: number) {
    return this.prisma.subject.findMany({
      where: {
        userFavoriteSubjects: {
          some: {
            user_id: userId,
          },
        },
      },
      include: {
        cards: true,
      },
    });
  }

  // Удаление предмета из избранного
  async removeFromFavorites(userId: number, subjectId: number) {
    return this.prisma.userFavoriteSubject.delete({
      where: {
        user_id_subject_id: {
          user_id: userId,
          subject_id: subjectId,
        },
      },
    });
  }

  async update(subjectId: number, dto: UpdateSubjectDto) {
    // Если нужно обновить группы — сначала удалим старые и создадим новые
    if (dto.groupNames) {
      await this.prisma.subjectGroup.deleteMany({
        where: { subjectId },
      });

      await this.prisma.subjectGroup.createMany({
        data: dto.groupNames.map(groupName => ({
          subjectId,
          groupName,
        })),
      });
    }

    // Обновим сам предмет (имя и тип)
    return this.prisma.subject.update({
      where: { id: subjectId },
      data: {
        name: dto.name,
        subject_type: dto.subject_type,
      },
      include: {
        subjectGroups: true,
      },
    });
  }
}
