import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Pago } from '../entities/pago.entity';

@Injectable()
export class MorososService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
    @InjectRepository(Pago)
    private pagoRepo: Repository<Pago>,
  ) {}

  async obtenerMorosos() {
    const habitantes = await this.usuarioRepo.find({
      select: ['id_usuario', 'nombre', 'correo', 'telefono'],
    });

    const morosos = [];
    const cuotaMensual = 50; // Q 50 por defecto

    for (const h of habitantes) {
      const pagos = await this.pagoRepo.find({
        where: { id_hogar: h.id_usuario as any },
        order: { fecha_pago: 'DESC' },
      });

      const ultimoPago = pagos[0]?.fecha_pago;
      const meses = this.calcularMesesMora(ultimoPago);

      if (meses > 0) {
        const deuda = meses * cuotaMensual;
        morosos.push({
          id_hogar: h.id_usuario,
          numero: `#${String(h.id_usuario).padStart(3, '0')}`,
          nombre: h.nombre,
          correo: h.correo,
          telefono: h.telefono,
          meses,
          deuda,
          ultimoPago: ultimoPago ? (typeof ultimoPago === 'string' ? ultimoPago : ultimoPago.toISOString().substring(0, 10)) : null,
          nivel: meses >= 3 ? 'Crítico' : meses >= 2 ? 'Alto' : 'Medio',
        });
      }
    }

    return morosos.sort((a, b) => b.meses - a.meses);
  }

  private calcularMesesMora(ultimaPago?: Date | string): number {
    if (!ultimaPago) return 0;
    const fecha = typeof ultimaPago === 'string' ? new Date(ultimaPago) : ultimaPago;
    const hoy = new Date();
    const meses = (hoy.getFullYear() - fecha.getFullYear()) * 12 + (hoy.getMonth() - fecha.getMonth());
    return meses > 0 ? meses : 0;
  }
}
