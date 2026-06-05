import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hogar } from '../entities/hogar.entity';

@Injectable()
export class HogarService {
  constructor(
    @InjectRepository(Hogar)
    private repo: Repository<Hogar>,
  ) {}

  findAll() { return this.repo.find({ relations: ['sector', 'usuario'] }); }

  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id_hogar: id }, relations: ['sector', 'usuario'] });
    if (!item) throw new NotFoundException('Registro no encontrado');
    return item;
  }

  async create(data: Partial<Hogar>) {
    try {
      return await this.repo.save(this.repo.create(data));
    } catch (error) {
      if (error.message?.includes('hogar_numero_hogar_key')) {
        throw new ConflictException('Ya existe un hogar con este número');
      }
      throw error;
    }
  }

  async update(id: number, data: Partial<Hogar>) {
    try {
      await this.repo.update(id, data as any);
      return this.findOne(id);
    } catch (error) {
      if (error.message?.includes('hogar_numero_hogar_key')) {
        throw new ConflictException('Ya existe un hogar con este número');
      }
      throw error;
    }
  }

  async delete(id: number) {
    await this.findOne(id);
    await this.repo.delete(id);
    return { message: 'Hogar eliminado exitosamente' };
  }
}
