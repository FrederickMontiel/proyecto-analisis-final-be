import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Usuario } from './usuario.entity';
import { DetalleDistribucion } from './detalle-distribucion.entity';

enum TipoCalendarioEnum {
  SEMANAL = 'Semanal',
  QUINCENAL = 'Quincenal',
  MENSUAL = 'Mensual',
}

enum EstadoEnum {
  ACTIVO = 'Activo',
  INACTIVO = 'Inactivo',
}

@Entity('calendario_distribucion')
export class CalendarioDistribucion {
  @PrimaryGeneratedColumn()
  id_calendario: number;

  @Column({ type: 'varchar', length: 100 })
  nombre_calendario: string;

  @Column({ type: 'date' })
  fecha_inicio_vigencia: string;

  @Column({ type: 'date', nullable: true })
  fecha_fin_vigencia: string;

  @Column({ type: 'enum', enum: TipoCalendarioEnum, default: TipoCalendarioEnum.SEMANAL })
  tipo: TipoCalendarioEnum;

  @Column({ type: 'enum', enum: EstadoEnum, default: EstadoEnum.ACTIVO })
  estado: EstadoEnum;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario_creador' })
  usuario_creador: Usuario;

  @Column()
  id_usuario_creador: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @OneToMany(() => DetalleDistribucion, (detalle) => detalle.calendario)
  detalles: DetalleDistribucion[];
}
