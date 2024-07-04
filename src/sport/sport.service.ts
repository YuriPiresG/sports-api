import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';
import { SportEntity } from './entities/sport.entity';

@Injectable()
export class SportService {
  constructor(
    @InjectRepository(SportEntity)
    private sportRepository: Repository<SportEntity>,
  ) {}

  async create(createSportDto: CreateSportDto) {
    const foundSport = await this.sportRepository.findOne({
      where: { name: createSportDto.name },
    });
    if (foundSport) {
      throw new BadRequestException(
        'A atividade esportiva já existe!',
        'SPORT_EXISTS',
      );
    }
    try {
      return this.sportRepository.save(createSportDto);
    } catch (error) {
      throw new ConflictException(
        'Erro ao criar a atividade esportiva: ',
        error,
      );
    }
  }

  async findAll() {
    const result = await this.sportRepository.find();
    if (result.length === 0) {
      throw new NotFoundException('Nenhuma atividade esportiva encontrada!');
    }
    return result;
  }

  async findOne(id: number) {
    const result = await this.sportRepository.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException('Atividade esportiva não encontrada!');
    }
    return result;
  }

  update(id: number, updateSportDto: UpdateSportDto) {
    const result = this.sportRepository.update(id, updateSportDto);
    if (!result) {
      throw new NotFoundException('Atividade esportiva não encontrada!');
    }
    return result;
  }

  async remove(id: number) {
    const result = await this.sportRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Atividade esportiva não encontrada!');
    }
    return result;
  }
}
