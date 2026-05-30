import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Pago } from '../entities/pago.entity';
import { MorososService } from './morosos.service';
import { MorososController } from './morosos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Pago])],
  providers: [MorososService],
  controllers: [MorososController],
})
export class MorososModule {}
