import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CalendarioDistribucion } from '../entities/calendario-distribucion.entity';
import { DetalleDistribucion } from '../entities/detalle-distribucion.entity';

@Injectable()
export class DistribucionService {
  constructor(
    @InjectRepository(CalendarioDistribucion)
    private calendarioRepo: Repository<CalendarioDistribucion>,
    @InjectRepository(DetalleDistribucion)
    private detalleRepo: Repository<DetalleDistribucion>,
  ) {}

  async crearCalendario(data: Partial<CalendarioDistribucion>) {
    return this.calendarioRepo.save(this.calendarioRepo.create(data));
  }

  async obtenerCalendarios() {
    return this.calendarioRepo.find({
      relations: ['usuario_creador', 'detalles', 'detalles.sector'],
      order: { fecha_creacion: 'DESC' },
    });
  }

  async obtenerCalendario(id: number) {
    const calendario = await this.calendarioRepo.findOne({
      where: { id_calendario: id },
      relations: ['usuario_creador', 'detalles', 'detalles.sector'],
    });
    if (!calendario) throw new NotFoundException('Calendario no encontrado');
    return calendario;
  }

  async actualizarCalendario(id: number, data: Partial<CalendarioDistribucion>) {
    await this.calendarioRepo.update(id, data);
    return this.obtenerCalendario(id);
  }

  async eliminarCalendario(id: number) {
    await this.detalleRepo.delete({ id_calendario: id });
    await this.calendarioRepo.delete(id);
  }

  async agregarDetalle(idCalendario: number, data: Partial<DetalleDistribucion>) {
    const calendario = await this.calendarioRepo.findOne({ where: { id_calendario: idCalendario } });
    if (!calendario) throw new NotFoundException('Calendario no encontrado');

    if (!data.id_sector) throw new BadRequestException('id_sector requerido');
    if (!data.dia_semana && data.dia_semana !== 0) throw new BadRequestException('dia_semana requerido');
    if (!data.hora_inicio) throw new BadRequestException('hora_inicio requerida');
    if (!data.hora_fin) throw new BadRequestException('hora_fin requerida');

    return this.detalleRepo.save(this.detalleRepo.create({ ...data, id_calendario: idCalendario }));
  }

  async obtenerDetallesPorSector(idSector: number) {
    return this.detalleRepo.find({
      where: { id_sector: idSector },
      relations: ['calendario', 'sector'],
      order: { dia_semana: 'ASC', hora_inicio: 'ASC' },
    });
  }

  async actualizarDetalle(idDetalle: number, data: Partial<DetalleDistribucion>) {
    await this.detalleRepo.update(idDetalle, data);
    return this.detalleRepo.findOne({
      where: { id_detalle: idDetalle },
      relations: ['calendario', 'sector'],
    });
  }

  async eliminarDetalle(idDetalle: number) {
    await this.detalleRepo.delete(idDetalle);
  }
}
