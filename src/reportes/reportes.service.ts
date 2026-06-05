import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as PDFDocument from 'pdfkit';
import { Pago } from '../entities/pago.entity';
import { Gasto } from '../entities/gasto.entity';
import { LecturaContador } from '../entities/lectura-contador.entity';
import { Incidencia } from '../entities/incidencia.entity';

@Injectable()
export class ReportesService {
  constructor(
    @InjectRepository(Pago) private pagoRepo: Repository<Pago>,
    @InjectRepository(Gasto) private gastoRepo: Repository<Gasto>,
    @InjectRepository(LecturaContador) private lecturaRepo: Repository<LecturaContador>,
    @InjectRepository(Incidencia) private incidenciaRepo: Repository<Incidencia>,
  ) {}

  async generarReporteTransparencia(fechaInicio: string, fechaFin: string): Promise<Buffer> {
    const doc = new PDFDocument({ size: 'A4', margin: 40 });
    const chunks: Buffer[] = [];

    doc.on('data', (chunk) => chunks.push(chunk));

    doc.fontSize(18).text('REPORTE DE TRANSPARENCIA FINANCIERA', { align: 'center' });
    doc.fontSize(10).text(`Período: ${fechaInicio} a ${fechaFin}`, { align: 'center' });
    doc.moveDown();

    const pagos = await this.pagoRepo.find({
      where: [
        { fecha_pago: { $gte: new Date(fechaInicio), $lte: new Date(fechaFin) } },
      ],
    });
    const gastos = await this.gastoRepo.find({
      where: [
        { fecha_gasto: { $gte: fechaInicio, $lte: fechaFin } },
      ],
    });

    const totalIngresos = pagos.reduce((sum, p) => sum + parseFloat(p.monto.toString()), 0);
    const totalGastos = gastos.reduce((sum, g) => sum + parseFloat(g.monto.toString()), 0);
    const balance = totalIngresos - totalGastos;

    doc.fontSize(12).text('RESUMEN FINANCIERO', { underline: true });
    doc.fontSize(10);
    doc.text(`Total Ingresos: Q ${totalIngresos.toFixed(2)}`);
    doc.text(`Total Gastos: Q ${totalGastos.toFixed(2)}`);
    doc.text(`Balance: Q ${balance.toFixed(2)}`, { color: balance >= 0 ? 'green' : 'red' });
    doc.moveDown();

    doc.fontSize(12).text('DETALLE DE INGRESOS (PAGOS)', { underline: true });
    doc.fontSize(9);
    pagos.forEach((p) => {
      doc.text(`${p.fecha_pago} - ${p.periodo_aplicado}: Q ${parseFloat(p.monto.toString()).toFixed(2)} (${p.metodo_pago})`);
    });
    doc.moveDown();

    doc.fontSize(12).text('DETALLE DE GASTOS', { underline: true });
    doc.fontSize(9);
    gastos.forEach((g) => {
      doc.text(`${g.fecha_gasto} - ${g.descripcion}: Q ${parseFloat(g.monto.toString()).toFixed(2)} (${g.categoria})`);
    });

    doc.end();
    return Buffer.concat(chunks);
  }

  async generarReporteConsumo(mes: string): Promise<Buffer> {
    const doc = new PDFDocument({ size: 'A4', margin: 40 });
    const chunks: Buffer[] = [];

    doc.on('data', (chunk) => chunks.push(chunk));

    doc.fontSize(18).text('REPORTE DE CONSUMO DE AGUA', { align: 'center' });
    doc.fontSize(10).text(`Mes: ${mes}`, { align: 'center' });
    doc.moveDown();

    const lecturas = await this.lecturaRepo.find({
      relations: ['hogar'],
      where: [
        { fecha_lectura: { $gte: new Date(`${mes}-01`), $lt: new Date(`${mes}-31`) } },
      ],
    });

    const consumosPorHogar = {};
    lecturas.forEach((l) => {
      const numeroHogar = l.hogar?.numero_hogar || 'N/A';
      if (!consumosPorHogar[numeroHogar]) consumosPorHogar[numeroHogar] = [];
      consumosPorHogar[numeroHogar].push(parseFloat(l.consumo_calculado.toString()));
    });

    doc.fontSize(12).text('RESUMEN DE CONSUMO POR HOGAR', { underline: true });
    doc.fontSize(9);

    Object.keys(consumosPorHogar).forEach((hogar) => {
      const consumos = consumosPorHogar[hogar];
      const promedio = consumos.reduce((a, b) => a + b, 0) / consumos.length;
      const nivel = promedio > 30 ? 'ALTO' : promedio > 15 ? 'NORMAL' : 'BAJO';
      const color = promedio > 30 ? 'red' : 'black';
      doc.text(`Hogar ${hogar}: ${promedio.toFixed(2)} m³ (${nivel})`, { color });
    });

    doc.end();
    return Buffer.concat(chunks);
  }
}
