import { PartialType } from '@nestjs/mapped-types';
import { CreateSportDto } from './create-sport.dto';

export class UpdateSportDto extends PartialType(CreateSportDto) {
  name: string;
  description: string;
  type: string;
  rules?: string;
  equipment?: string[];
}
