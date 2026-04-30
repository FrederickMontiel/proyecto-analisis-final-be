import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notificacion } from '../entities/notificacion.entity';

@Injectable()
export class NotificacionService {
  constructor(
    @InjectRepository(Notificacion)
    private repo: Repository<Notificacion>,
  ) {}

  findAll() { return this.repo.find(); }

  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id_notificacion: id } as any });
    if (!item) throw new NotFoundException('Registro no encontrado');
    return item;
  }

  create(data: Partial<Notificacion>) { return this.repo.save(this.repo.create(data)); }

  async update(id: number, data: Partial<Notificacion>) {
    await this.repo.update(id, data as any);
    return this.findOne(id);
  }
}// Notificaciones masivas: todos, por sector, por rol, tipos Urgente/Info
