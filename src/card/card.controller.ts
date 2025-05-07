import { Controller, Post, Body, UseGuards, Get, Query, Delete } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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
  @Delete(':id')
  async delete(@Query('id') cardId: string) {
    return this.cardService.deleteCardById(Number(cardId));
  }
}
