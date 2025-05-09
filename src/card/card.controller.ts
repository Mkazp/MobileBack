import { Controller, Post, Body, UseGuards, Get, Query, Delete } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser, User as JwtUser } from '../auth/get-user.decorator';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateCardDto) {
    return this.cardService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('by-subject')
  getBySubject(@Query('subjectId') subjectId: string) {
    return this.cardService.getCardsBySubject(Number(subjectId));
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.cardService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Query('id') cardId: string) {
    return this.cardService.deleteCardById(Number(cardId));
  }

  // Добавить в избранное
  @UseGuards(JwtAuthGuard)
  @Post('favorite')
  addToFavorites(@Query('cardId') cardId: string, @GetUser() user: JwtUser) {
    return this.cardService.addToFavorites(user.id, Number(cardId));
  }

  // Получить все избранные карточки
  @UseGuards(JwtAuthGuard)
  @Get('favorites')
  getFavorites(@GetUser() user: JwtUser) {
    return this.cardService.getFavoriteCards(user.id);
  }

  // Удалить из избранного
  @UseGuards(JwtAuthGuard)
  @Delete('favorite')
  removeFromFavorites(@Query('cardId') cardId: string, @GetUser() user: JwtUser) {
    return this.cardService.removeFromFavorites(user.id, Number(cardId));
  }
}
