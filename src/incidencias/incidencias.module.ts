import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncidenciaController } from './incidencias.controller';
import { IncidenciaService } from './incidencias.service';
import { Incidencia } from '../entities/incidencia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Incidencia])],
  controllers: [IncidenciaController],
  providers: [IncidenciaService],
  exports: [IncidenciaService],
})
export class IncidenciasModule {}// Gestion sectores flutter: CRUD sectores y asignacion hogares
