import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CalendarioDistribucion } from './calendario-distribucion.entity';
import { Sector } from './sector.entity';

@Entity('detalle_distribucion')
export class DetalleDistribucion {
  @PrimaryGeneratedColumn()
  id_detalle: number;

  @ManyToOne(() => CalendarioDistribucion, (calendario) => calendario.detalles)
  @JoinColumn({ name: 'id_calendario' })
  calendario: CalendarioDistribucion;

  @Column()
  id_calendario: number;

  @ManyToOne(() => Sector)
  @JoinColumn({ name: 'id_sector' })
  sector: Sector;

  @Column()
  id_sector: number;

  @Column({ type: 'smallint' })
  dia_semana: number; // 1-7 (Lunes a Domingo)

  @Column({ type: 'time' })
  hora_inicio: string; // HH:MM:SS

  @Column({ type: 'time' })
  hora_fin: string; // HH:MM:SS

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;
}
