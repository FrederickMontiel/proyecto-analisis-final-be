import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { EstadoEnum } from './usuario.entity';

@Entity('sector')
export class Sector {
  @PrimaryGeneratedColumn()
  id_sector: number;

  @Column({ length: 50, unique: true })
  nombre_sector: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ default: 0 })
  numero_hogares: number;

  @Column({ type: 'enum', enum: EstadoEnum, default: EstadoEnum.ACTIVO })
  estado: EstadoEnum;
}
// Sectores validados contra seed de datos San Miguel
