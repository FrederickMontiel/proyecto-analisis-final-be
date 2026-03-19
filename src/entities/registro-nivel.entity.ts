import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Tanque } from './tanque.entity';
import { Usuario } from './usuario.entity';

export enum EstadoNivelEnum {
  NORMAL = 'Normal',
  ALERTA = 'Alerta',
  CRITICO = 'Crítico',
}

@Entity('registro_nivel')
export class RegistroNivel {
  @PrimaryGeneratedColumn()
  id_registro: number;

  @ManyToOne(() => Tanque)
  @JoinColumn({ name: 'id_tanque' })
  tanque: Tanque;

  @Column()
  id_tanque: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  nivel_porcentaje: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  nivel_litros: number;

  @CreateDateColumn()
  fecha_registro: Date;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @Column()
  id_usuario: number;

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @Column({ type: 'enum', enum: EstadoNivelEnum, default: EstadoNivelEnum.NORMAL })
  estado: EstadoNivelEnum;
}
