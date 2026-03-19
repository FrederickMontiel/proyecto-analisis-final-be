import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Incidencia } from './incidencia.entity';

export enum CategoriaGastoEnum {
  MANTENIMIENTO = 'Mantenimiento',
  REPARACION = 'Reparación',
  ENERGIA = 'Energía',
  OTRO = 'Otro',
}

@Entity('gasto')
export class Gasto {
  @PrimaryGeneratedColumn()
  id_gasto: number;

  @Column({ length: 200 })
  descripcion: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monto: number;

  @Column({ type: 'date' })
  fecha_gasto: Date;

  @Column({ type: 'enum', enum: CategoriaGastoEnum })
  categoria: CategoriaGastoEnum;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario_registro' })
  usuarioRegistro: Usuario;

  @Column()
  id_usuario_registro: number;

  @ManyToOne(() => Incidencia, { nullable: true })
  @JoinColumn({ name: 'id_incidencia' })
  incidencia: Incidencia;

  @Column({ nullable: true })
  id_incidencia: number;

  @Column({ length: 100, nullable: true })
  comprobante: string;

  @CreateDateColumn()
  fecha_registro: Date;
}
