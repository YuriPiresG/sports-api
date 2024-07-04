import { Module } from '@nestjs/common';
import { SportService } from './sport.service';
import { SportController } from './sport.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportEntity } from './entities/sport.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SportEntity])],
  controllers: [SportController],
  providers: [SportService],
  exports: [SportService],
})
export class SportModule {}
