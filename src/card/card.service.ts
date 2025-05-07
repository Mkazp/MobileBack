import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';

@Injectable()
export class CardService {
  constructor(private prisma: PrismaService) {}

  // Метод для создания карточки
  async create(dto: CreateCardDto) {
    return this.prisma.card.create({
      data: {
        title: dto.title,
        description: dto.description,
        subject_id: dto.subject_id,
      },
    });
  }

  // Метод для получения всех карточек для конкретного предмета
  async getCardsBySubject(subjectId: number) {
    return this.prisma.card.findMany({
      where: { subject_id: subjectId },
    });
  }

  // Метод для удаления карточки по ID
  async deleteCardById(cardId: number) {
    return this.prisma.card.delete({
      where: {
        id: cardId,
      },
    });
  }
}
