import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistroNivelController } from './niveles.controller';
import { RegistroNivelService } from './niveles.service';
import { RegistroNivel } from '../entities/registro-nivel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RegistroNivel])],
  controllers: [RegistroNivelController],
  providers: [RegistroNivelService],
  exports: [RegistroNivelService],
})
export class NivelesModule {}