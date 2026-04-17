import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Hogar } from './hogar.entity';
import { Usuario } from './usuario.entity';

export enum EstadoContadorEnum {
  NORMAL = 'Normal',
  DANADO = 'Dañado',
  REQUIERE_MANTENIMIENTO = 'Requiere Mantenimiento',
  NO_ACCESIBLE = 'No Accesible',
}

export enum OrigenLecturaEnum {
  MANUAL = 'Manual',
  SENSOR = 'Sensor',
}

@Entity('lectura_contador')
export class LecturaContador {
  @PrimaryGeneratedColumn()
  id_lectura: number;

  @ManyToOne(() => Hogar)
  @JoinColumn({ name: 'id_hogar' })
  hogar: Hogar;

  @Column()
  id_hogar: number;

  @Column({ type: 'timestamp' })
  fecha_lectura: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  lectura_actual: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  lectura_anterior: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  consumo_calculado: number;

  @Column({ length: 50, nullable: true })
  unidad_medida: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario_lector' })
  usuarioLector: Usuario;

  @Column()
  id_usuario_lector: number;

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @Column({ type: 'enum', enum: EstadoContadorEnum, default: EstadoContadorEnum.NORMAL })
  estado_contador: EstadoContadorEnum;

  @Column({ length: 255, nullable: true })
  foto_contador: string;

  @Column({ type: 'enum', enum: OrigenLecturaEnum, default: OrigenLecturaEnum.MANUAL })
  origen_lectura: OrigenLecturaEnum;

  @CreateDateColumn()
  fecha_registro: Date;
}
// Desperdicio: alerta automatica cuando consumo >25 m3/mes parametrizable
