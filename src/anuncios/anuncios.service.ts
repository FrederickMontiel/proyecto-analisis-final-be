import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Anuncio, SiNoEnum } from '../entities/anuncio.entity';

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

  private transformData(data: Partial<Anuncio>) {
    if (data.enviar_notificacion !== undefined && typeof data.enviar_notificacion === 'boolean') {
      data.enviar_notificacion = data.enviar_notificacion ? SiNoEnum.SI : SiNoEnum.NO;
    }
    return data;
  }

  create(data: Partial<Anuncio>) {
    return this.repo.save(this.repo.create(this.transformData(data)));
  }

  async update(id: number, data: Partial<Anuncio>) {
    await this.repo.update(id, this.transformData(data) as any);
    return this.findOne(id);
  }
}// Anuncios: vigencia configurable, archivado automatico al vencer
