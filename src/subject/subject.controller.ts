import { Controller, Post, Body, Get, UseGuards, Delete, Param, Patch } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser, User as JwtUser } from '../auth/get-user.decorator';
import { UpdateSubjectDto } from './dto/update-subject.dto';
@Controller('subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateSubjectDto) {
    return this.subjectService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getUserSubjects(@GetUser() user: JwtUser) {
    return this.subjectService.findByUserGroup(user.group_name);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.subjectService.deleteById(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  getAllSubjects() {
    return this.subjectService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/favorite')
  addToFavorites(@Param('id') subjectId: string, @GetUser() user: JwtUser) {
    return this.subjectService.addToFavorites(user.id, Number(subjectId));
  }

  @UseGuards(JwtAuthGuard)
  @Get('favorites')
  getFavoriteSubjects(@GetUser() user: JwtUser) {
    return this.subjectService.getFavoriteSubjects(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/favorite')
  removeFromFavorites(@Param('id') subjectId: string, @GetUser() user: JwtUser) {
    return this.subjectService.removeFromFavorites(user.id, Number(subjectId));
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSubjectDto) {
    return this.subjectService.update(Number(id), dto);
  }
}
