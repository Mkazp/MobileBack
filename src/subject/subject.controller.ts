import { Controller, Post, Body, Get, UseGuards, Delete, Param } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser, User as JwtUser } from '../auth/get-user.decorator';

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
}
