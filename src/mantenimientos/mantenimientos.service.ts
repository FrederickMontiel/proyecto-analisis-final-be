import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mantenimiento } from '../entities/mantenimiento.entity';

@Injectable()
export class MantenimientoService {
  constructor(
    @InjectRepository(Mantenimiento)
    private repo: Repository<Mantenimiento>,
  ) {}

  findAll() {
    return this.repo.find({
      relations: ['usuario', 'incidencia', 'proveedor'],
      order: { fecha_realizacion: 'DESC' },
    });
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({
      where: { id_mantenimiento: id } as any,
      relations: ['usuario', 'incidencia', 'proveedor'],
    });
    if (!item) throw new NotFoundException('Registro no encontrado');
    return item;
  }

  create(data: Partial<Mantenimiento>) { return this.repo.save(this.repo.create(data)); }

  async update(id: number, data: Partial<Mantenimiento>) {
    await this.repo.update(id, data as any);
    return this.findOne(id);
  }

  async obtenerProximos() {
    const hoy = new Date();
    const en7dias = new Date(hoy.getTime() + 7 * 24 * 60 * 60 * 1000);
    return this.repo.find({
      where: [
        { tipo_mantenimiento: 'Preventivo', fecha_realizacion: { $between: [hoy, en7dias] } },
      ],
      relations: ['usuario', 'proveedor'],
      order: { fecha_realizacion: 'ASC' },
    });
  }
}
