import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Incidencia } from '../entities/incidencia.entity';
import { CambioEstadoIncidencia } from '../entities/cambio-estado-incidencia.entity';

@Injectable()
export class IncidenciaService {
  constructor(
    @InjectRepository(Incidencia)
    private repo: Repository<Incidencia>,
    @InjectRepository(CambioEstadoIncidencia)
    private cambioRepo: Repository<CambioEstadoIncidencia>,
  ) {}

  findAll() {
    return this.repo.find({
      relations: ['usuarioReporta', 'sector'],
      order: { fecha_reporte: 'DESC' },
    });
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({
      where: { id_incidencia: id } as any,
      relations: ['usuarioReporta', 'sector'],
    });
    if (!item) throw new NotFoundException('Incidencia no encontrada');
    return item;
  }

  async obtenerConHistorial(id: number) {
    const incidencia = await this.findOne(id);
    const cambios = await this.cambioRepo.find({
      where: { id_incidencia: id },
      relations: ['usuario'],
      order: { fecha_cambio: 'ASC' },
    });
    return { ...incidencia, historial_cambios: cambios };
  }

  create(data: Partial<Incidencia>) {
    return this.repo.save(this.repo.create(data));
  }

  async update(id: number, data: Partial<Incidencia>, idUsuario?: number) {
    const incidencia = await this.findOne(id);

    if (data.estado && data.estado !== incidencia.estado) {
      await this.cambioRepo.save(this.cambioRepo.create({
        id_incidencia: id,
        estado_anterior: incidencia.estado,
        estado_nuevo: data.estado,
        id_usuario: idUsuario || 1,
      }));
    }

    await this.repo.update(id, data as any);
    return this.obtenerConHistorial(id);
  }
}

