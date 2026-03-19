import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GastoController } from './gastos.controller';
import { GastoService } from './gastos.service';
import { Gasto } from '../entities/gasto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gasto])],
  controllers: [GastoController],
  providers: [GastoService],
  exports: [GastoService],
})
export class GastoModule {}