// subject/dto/update-subject.dto.ts
import { IsOptional, IsString, IsArray } from 'class-validator';

export class UpdateSubjectDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  subject_type?: string;

  @IsOptional()
  @IsArray()
  groupNames?: string[];
}
