import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagoController } from './pagos.controller';
import { PagoService } from './pagos.service';
import { Pago } from '../entities/pago.entity';
import { Usuario } from '../entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pago, Usuario])],
  controllers: [PagoController],
  providers: [PagoService],
  exports: [PagoService],
})
export class PagosModule {}// Pantalla registro pago flutter verificada con endpoints
