import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificacionController } from './notificaciones.controller';
import { NotificacionService } from './notificaciones.service';
import { Notificacion } from '../entities/notificacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notificacion])],
  controllers: [NotificacionController],
  providers: [NotificacionService],
  exports: [NotificacionService],
})
export class NotificacionModule {}