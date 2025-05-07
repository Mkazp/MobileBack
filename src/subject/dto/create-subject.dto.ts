import { IsString, IsArray, IsNotEmpty } from 'class-validator';

export class CreateSubjectDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  subject_type!: string;

  @IsArray()
  groupNames!: string[];
}
