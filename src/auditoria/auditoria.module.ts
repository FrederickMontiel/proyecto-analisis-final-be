import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogAuditoriaController } from './auditoria.controller';
import { LogAuditoriaService } from './auditoria.service';
import { LogAuditoria } from '../entities/log-auditoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LogAuditoria])],
  controllers: [LogAuditoriaController],
  providers: [LogAuditoriaService],
  exports: [LogAuditoriaService],
})
export class AuditoriaModule {}