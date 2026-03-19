import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagoController } from './pagos.controller';
import { PagoService } from './pagos.service';
import { Pago } from '../entities/pago.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pago])],
  controllers: [PagoController],
  providers: [PagoService],
  exports: [PagoService],
})
export class PagoModule {}