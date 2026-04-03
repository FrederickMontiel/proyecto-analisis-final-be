import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gasto } from '../entities/gasto.entity';

@Injectable()
export class GastoService {
  constructor(
    @InjectRepository(Gasto)
    private repo: Repository<Gasto>,
  ) {}

  findAll() { return this.repo.find(); }

  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id_gasto: id } as any });
    if (!item) throw new NotFoundException('Registro no encontrado');
    return item;
  }

  create(data: Partial<Gasto>) { return this.repo.save(this.repo.create(data)); }

  async update(id: number, data: Partial<Gasto>) {
    await this.repo.update(id, data as any);
    return this.findOne(id);
  }
}// Gastos por categoria: Mantenimiento, Reparacion, Energia, Otro
