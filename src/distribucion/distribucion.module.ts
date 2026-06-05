import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistribucionService } from './distribucion.service';
import { DistribucionController } from './distribucion.controller';
import { CalendarioDistribucion } from '../entities/calendario-distribucion.entity';
import { DetalleDistribucion } from '../entities/detalle-distribucion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CalendarioDistribucion, DetalleDistribucion])],
  providers: [DistribucionService],
  controllers: [DistribucionController],
  exports: [DistribucionService],
})
export class DistribucionModule {}
