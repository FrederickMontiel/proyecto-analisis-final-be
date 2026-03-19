import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParametrosSistema } from '../entities/parametros-sistema.entity';

@Injectable()
export class ParametrosSistemaService {
  constructor(
    @InjectRepository(ParametrosSistema)
    private repo: Repository<ParametrosSistema>,
  ) {}

  findAll() { return this.repo.find(); }

  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id_parametro: id } as any });
    if (!item) throw new NotFoundException('Registro no encontrado');
    return item;
  }

  create(data: Partial<ParametrosSistema>) { return this.repo.save(this.repo.create(data)); }

  async update(id: number, data: Partial<ParametrosSistema>) {
    await this.repo.update(id, data as any);
    return this.findOne(id);
  }
}