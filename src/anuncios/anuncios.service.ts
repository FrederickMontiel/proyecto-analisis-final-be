import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Anuncio } from '../entities/anuncio.entity';

@Injectable()
export class AnuncioService {
  constructor(
    @InjectRepository(Anuncio)
    private repo: Repository<Anuncio>,
  ) {}

  findAll() { return this.repo.find(); }

  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id_anuncio: id } as any });
    if (!item) throw new NotFoundException('Registro no encontrado');
    return item;
  }

  create(data: Partial<Anuncio>) { return this.repo.save(this.repo.create(data)); }

  async update(id: number, data: Partial<Anuncio>) {
    await this.repo.update(id, data as any);
    return this.findOne(id);
  }
}