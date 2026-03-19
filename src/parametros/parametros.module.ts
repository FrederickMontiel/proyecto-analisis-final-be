import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParametrosSistemaController } from './parametros.controller';
import { ParametrosSistemaService } from './parametros.service';
import { ParametrosSistema } from '../entities/parametros-sistema.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParametrosSistema])],
  controllers: [ParametrosSistemaController],
  providers: [ParametrosSistemaService],
  exports: [ParametrosSistemaService],
})
export class ParametrosSistemaModule {}