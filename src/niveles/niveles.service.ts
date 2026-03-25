import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistroNivel } from '../entities/registro-nivel.entity';

@Injectable()
export class RegistroNivelService {
  constructor(
    @InjectRepository(RegistroNivel)
    private repo: Repository<RegistroNivel>,
  ) {}

  findAll() { return this.repo.find(); }

  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id_registro: id } as any });
    if (!item) throw new NotFoundException('Registro no encontrado');
    return item;
  }

  create(data: Partial<RegistroNivel>) { return this.repo.save(this.repo.create(data)); }

  async update(id: number, data: Partial<RegistroNivel>) {
    await this.repo.update(id, data as any);
    return this.findOne(id);
  }
}// Alertas: alerta <40%, critico <20% segun parametros del sistema
