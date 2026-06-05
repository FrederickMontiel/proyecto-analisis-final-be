import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HogarController } from './hogares.controller';
import { HogarService } from './hogares.service';
import { Hogar } from '../entities/hogar.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hogar])],
  controllers: [HogarController],
  providers: [HogarService],
  exports: [HogarService],
})
export class HogaresModule {}
