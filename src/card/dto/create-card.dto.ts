import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateCardDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsInt()
  subject_id!: number;
}
