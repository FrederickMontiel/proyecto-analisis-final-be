import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectorController } from './sectores.controller';
import { SectorService } from './sectores.service';
import { Sector } from '../entities/sector.entity';
import { Hogar } from '../entities/hogar.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sector, Hogar])],
  controllers: [SectorController],
  providers: [SectorService],
  exports: [SectorService],
})
export class SectoresModule {}