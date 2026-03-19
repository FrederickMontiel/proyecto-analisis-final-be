import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sector } from '../entities/sector.entity';

@Injectable()
export class SectorService {
  constructor(
    @InjectRepository(Sector)
    private repo: Repository<Sector>,
  ) {}

  findAll() { return this.repo.find(); }

  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id_sector: id } as any });
    if (!item) throw new NotFoundException('Registro no encontrado');
    return item;
  }

  create(data: Partial<Sector>) { return this.repo.save(this.repo.create(data)); }

  async update(id: number, data: Partial<Sector>) {
    await this.repo.update(id, data as any);
    return this.findOne(id);
  }
}