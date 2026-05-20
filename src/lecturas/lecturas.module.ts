import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LecturaContadorController } from './lecturas.controller';
import { LecturaContadorService } from './lecturas.service';
import { LecturaContador } from '../entities/lectura-contador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LecturaContador])],
  controllers: [LecturaContadorController],
  providers: [LecturaContadorService],
  exports: [LecturaContadorService],
})
export class LecturasModule {}