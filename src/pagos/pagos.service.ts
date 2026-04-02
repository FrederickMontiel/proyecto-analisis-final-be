import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pago } from '../entities/pago.entity';

@Injectable()
export class PagoService {
  constructor(
    @InjectRepository(Pago)
    private repo: Repository<Pago>,
  ) {}

  findAll() { return this.repo.find(); }

  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id_pago: id } as any });
    if (!item) throw new NotFoundException('Registro no encontrado');
    return item;
  }

  create(data: Partial<Pago>) { return this.repo.save(this.repo.create(data)); }

  async update(id: number, data: Partial<Pago>) {
    await this.repo.update(id, data as any);
    return this.findOne(id);
  }
}// Pagos manuales: efectivo, transferencia, deposito - comprobantes correlativos
