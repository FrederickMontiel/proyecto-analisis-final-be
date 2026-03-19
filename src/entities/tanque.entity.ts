import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { EstadoEnum } from './usuario.entity';

@Entity('tanque')
export class Tanque {
  @PrimaryGeneratedColumn()
  id_tanque: number;

  @Column({ length: 100 })
  nombre_tanque: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  capacidad_litros: number;

  @Column({ length: 200, nullable: true })
  ubicacion: string;

  @Column({ length: 50, nullable: true })
  tipo: string;

  @Column({ type: 'date', nullable: true })
  fecha_instalacion: Date;

  @Column({ type: 'enum', enum: EstadoEnum, default: EstadoEnum.ACTIVO })
  estado: EstadoEnum;
}
