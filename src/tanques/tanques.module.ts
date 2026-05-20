import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TanqueController } from './tanques.controller';
import { TanqueService } from './tanques.service';
import { Tanque } from '../entities/tanque.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tanque])],
  controllers: [TanqueController],
  providers: [TanqueService],
  exports: [TanqueService],
})
export class TanquesModule {}