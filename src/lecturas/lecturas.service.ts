import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LecturaContador } from '../entities/lectura-contador.entity';

@Injectable()
export class LecturaContadorService {
  constructor(
    @InjectRepository(LecturaContador)
    private repo: Repository<LecturaContador>,
  ) {}

  findAll() { return this.repo.find(); }

  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id_lectura: id } as any });
    if (!item) throw new NotFoundException('Registro no encontrado');
    return item;
  }

  create(data: Partial<LecturaContador>) { return this.repo.save(this.repo.create(data)); }

  async update(id: number, data: Partial<LecturaContador>) {
    await this.repo.update(id, data as any);
    return this.findOne(id);
  }
}// consumo = lectura_actual - lectura_anterior, alerta si >30 m3
