import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Sector } from './sector.entity';
import { Usuario } from './usuario.entity';
import { EstadoEnum } from './usuario.entity';

@Entity('hogar')
export class Hogar {
  @PrimaryGeneratedColumn()
  id_hogar: number;

  @Column({ length: 20, unique: true })
  numero_hogar: string;

  @Column({ length: 100 })
  responsable: string;

  @Column({ length: 200 })
  direccion: string;

  @Column({ length: 15, nullable: true })
  telefono_contacto: string;

  @Column({ default: 1 })
  numero_habitantes: number;

  @ManyToOne(() => Sector, { nullable: true })
  @JoinColumn({ name: 'id_sector' })
  sector: Sector;

  @Column({ nullable: true })
  id_sector: number;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @Column({ nullable: true })
  id_usuario: number;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  fecha_alta: Date;

  @Column({ type: 'enum', enum: EstadoEnum, default: EstadoEnum.ACTIVO })
  estado: EstadoEnum;
}
