import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Hogar } from './hogar.entity';
import { Usuario } from './usuario.entity';

export enum MetodoPagoEnum {
  EFECTIVO = 'Efectivo',
  TRANSFERENCIA = 'Transferencia',
  DEPOSITO = 'Depósito',
  OTRO = 'Otro',
}

@Entity('pago')
export class Pago {
  @PrimaryGeneratedColumn()
  id_pago: number;

  @ManyToOne(() => Hogar)
  @JoinColumn({ name: 'id_hogar' })
  hogar: Hogar;

  @Column()
  id_hogar: number;

  @Column({ type: 'date' })
  fecha_pago: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monto: number;

  @Column({ type: 'enum', enum: MetodoPagoEnum })
  metodo_pago: MetodoPagoEnum;

  @Column({ length: 50, nullable: true })
  numero_recibo: string;

  @Column({ length: 20 })
  periodo_aplicado: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario_registro' })
  usuarioRegistro: Usuario;

  @Column()
  id_usuario_registro: number;

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @CreateDateColumn()
  fecha_registro: Date;
}
