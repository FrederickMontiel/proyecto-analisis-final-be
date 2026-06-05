import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportesService } from './reportes.service';
import { ReportesController } from './reportes.controller';
import { Pago } from '../entities/pago.entity';
import { Gasto } from '../entities/gasto.entity';
import { LecturaContador } from '../entities/lectura-contador.entity';
import { Incidencia } from '../entities/incidencia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pago, Gasto, LecturaContador, Incidencia])],
  providers: [ReportesService],
  controllers: [ReportesController],
})
export class ReportesModule {}
