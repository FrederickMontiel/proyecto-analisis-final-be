import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pago } from '../entities/pago.entity';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class PagoService {
  private readonly CUOTA_MENSUAL = 50;

  constructor(
    @InjectRepository(Pago)
    private repo: Repository<Pago>,
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
  ) {}

  findAll() { return this.repo.find(); }

  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id_pago: id } as any });
    if (!item) throw new NotFoundException('Registro no encontrado');
    return item;
  }

  async create(data: Partial<Pago>) {
    const mora = await this.calcularMora(data.id_hogar);
    let observacion = data.observaciones || '';

    if (mora > 0) {
      const monto = Number(data.monto) || 0;
      if (monto >= mora) {
        observacion = `[MORA CUBIERTA] Pago cubre mora completa de Q ${mora.toFixed(2)}. Excedente: Q ${(monto - mora).toFixed(2)}. ${observacion}`.trim();
      } else {
        observacion = `[PAGO A MORA] Aplicado Q ${monto.toFixed(2)} de mora pendiente Q ${mora.toFixed(2)}. Deuda restante: Q ${(mora - monto).toFixed(2)}. ${observacion}`.trim();
      }
    }

    data.observaciones = observacion;
    return this.repo.save(this.repo.create(data));
  }

  private async calcularMora(idHogar: number): Promise<number> {
    const pagos = await this.repo.find({
      where: { id_hogar: idHogar as any },
      order: { fecha_pago: 'DESC' },
    });

    if (pagos.length === 0) return 0;

    const ultimoPago = pagos[0].fecha_pago;
    const fecha = typeof ultimoPago === 'string' ? new Date(ultimoPago) : ultimoPago;
    const hoy = new Date();
    const meses = (hoy.getFullYear() - fecha.getFullYear()) * 12 + (hoy.getMonth() - fecha.getMonth());

    return meses > 0 ? meses * this.CUOTA_MENSUAL : 0;
  }

  async update(id: number, data: Partial<Pago>) {
    await this.repo.update(id, data as any);
    return this.findOne(id);
  }
}// Pagos manuales: efectivo, transferencia, deposito - comprobantes correlativos
