import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Incidencia } from './incidencia.entity';

export enum TipoMantenimientoEnum {
  PREVENTIVO = 'Preventivo',
  CORRECTIVO = 'Correctivo',
}

@Entity('mantenimiento')
export class Mantenimiento {
  @PrimaryGeneratedColumn()
  id_mantenimiento: number;

  @Column({ type: 'enum', enum: TipoMantenimientoEnum })
  tipo_mantenimiento: TipoMantenimientoEnum;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'date' })
  fecha_realizacion: Date;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @Column()
  id_usuario: number;

  @ManyToOne(() => Incidencia, { nullable: true })
  @JoinColumn({ name: 'id_incidencia' })
  incidencia: Incidencia;

  @Column({ nullable: true })
  id_incidencia: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  costo: number;

  @Column({ type: 'text', nullable: true })
  observaciones: string;
}
