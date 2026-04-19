import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mantenimiento } from '../entities/mantenimiento.entity';

@Injectable()
export class MantenimientoService {
  constructor(
    @InjectRepository(Mantenimiento)
    private repo: Repository<Mantenimiento>,
  ) {}

  findAll() { return this.repo.find(); }

  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id_mantenimiento: id } as any });
    if (!item) throw new NotFoundException('Registro no encontrado');
    return item;
  }

  create(data: Partial<Mantenimiento>) { return this.repo.save(this.repo.create(data)); }

  async update(id: number, data: Partial<Mantenimiento>) {
    await this.repo.update(id, data as any);
    return this.findOne(id);
  }
}// Mantenimientos: preventivos y correctivos, vinculados a incidencias
