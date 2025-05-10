import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

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

  async findAll() {
    return this.prisma.card.findMany({
      include: {
        subject: true, // Если хочешь включить информацию о предмете
      },
    });
  }

  // Метод для удаления карточки по ID
  async deleteCardById(id: number) {
    console.log('Удаление карточки с ID:', id);
    return this.prisma.$transaction([
      // Удаляем из избранного всех пользователей
      this.prisma.userFavoriteCard.deleteMany({
        where: { card_id: id },
      }),

      // Удаляем саму карточку
      this.prisma.card.delete({
        where: { id: id },
      }),
    ]);
  }

  async addToFavorites(userId: number, cardId: number) {
    return this.prisma.userFavoriteCard.create({
      data: {
        user_id: userId,
        card_id: cardId,
      },
    });
  }

  async getFavoriteCards(userId: number) {
    return this.prisma.card.findMany({
      where: {
        userFavoriteCards: {
          some: {
            user_id: userId,
          },
        },
      },
      include: {
        subject: true, // если нужно видеть предмет, к которому относится карточка
      },
    });
  }

  async removeFromFavorites(userId: number, cardId: number) {
    return this.prisma.userFavoriteCard.delete({
      where: {
        user_id_card_id: {
          user_id: userId,
          card_id: cardId,
        },
      },
    });
  }

  async updateCard(cardId: number, dto: UpdateCardDto) {
    return this.prisma.card.update({
      where: { id: cardId },
      data: dto,
    });
  }
}
