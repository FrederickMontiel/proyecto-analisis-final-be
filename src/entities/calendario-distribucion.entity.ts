import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Usuario } from './usuario.entity';
import { DetalleDistribucion } from './detalle-distribucion.entity';

@Entity('calendario_distribucion')
export class CalendarioDistribucion {
  @PrimaryGeneratedColumn()
  id_calendario: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario_creador' })
  usuario_creador: Usuario;

  @Column()
  id_usuario_creador: number;

  @Column({ type: 'text', nullable: true })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  fecha_actualizacion: Date;

  @OneToMany(() => DetalleDistribucion, (detalle) => detalle.calendario)
  detalles: DetalleDistribucion[];
}
