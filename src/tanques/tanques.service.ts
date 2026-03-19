import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tanque } from '../entities/tanque.entity';

@Injectable()
export class TanqueService {
  constructor(
    @InjectRepository(Tanque)
    private repo: Repository<Tanque>,
  ) {}

  findAll() { return this.repo.find(); }

  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id_tanque: id } as any });
    if (!item) throw new NotFoundException('Registro no encontrado');
    return item;
  }

  create(data: Partial<Tanque>) { return this.repo.save(this.repo.create(data)); }

  async update(id: number, data: Partial<Tanque>) {
    await this.repo.update(id, data as any);
    return this.findOne(id);
  }
}