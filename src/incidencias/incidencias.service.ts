import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Incidencia } from '../entities/incidencia.entity';

@Injectable()
export class IncidenciaService {
  constructor(
    @InjectRepository(Incidencia)
    private repo: Repository<Incidencia>,
  ) {}

  findAll() { return this.repo.find(); }

  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id_incidencia: id } as any });
    if (!item) throw new NotFoundException('Registro no encontrado');
    return item;
  }

  create(data: Partial<Incidencia>) { return this.repo.save(this.repo.create(data)); }

  async update(id: number, data: Partial<Incidencia>) {
    await this.repo.update(id, data as any);
    return this.findOne(id);
  }
}