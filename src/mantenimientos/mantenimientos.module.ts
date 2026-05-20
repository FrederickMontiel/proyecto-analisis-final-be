import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MantenimientoController } from './mantenimientos.controller';
import { MantenimientoService } from './mantenimientos.service';
import { Mantenimiento } from '../entities/mantenimiento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mantenimiento])],
  controllers: [MantenimientoController],
  providers: [MantenimientoService],
  exports: [MantenimientoService],
})
export class MantenimientosModule {}