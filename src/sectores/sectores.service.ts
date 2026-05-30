import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
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

  async create(data: Partial<Sector>) {
    try {
      return await this.repo.save(this.repo.create(data));
    } catch (error) {
      if (error.message?.includes('sector_nombre_sector_key')) {
        throw new ConflictException('No pueden existir dos sectores con el mismo nombre');
      }
      throw error;
    }
  }

  async update(id: number, data: Partial<Sector>) {
    try {
      await this.repo.update(id, data as any);
      return this.findOne(id);
    } catch (error) {
      if (error.message?.includes('sector_nombre_sector_key')) {
        throw new ConflictException('No pueden existir dos sectores con el mismo nombre');
      }
      throw error;
    }
  }
}// Sectores con validacion de hogares asignados
