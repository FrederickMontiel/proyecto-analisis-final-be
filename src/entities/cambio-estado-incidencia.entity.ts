import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Incidencia } from './incidencia.entity';
import { Usuario } from './usuario.entity';

@Entity('cambio_estado_incidencia')
export class CambioEstadoIncidencia {
  @PrimaryGeneratedColumn()
  id_cambio: number;

  @ManyToOne(() => Incidencia)
  @JoinColumn({ name: 'id_incidencia' })
  incidencia: Incidencia;

  @Column()
  id_incidencia: number;

  @Column({ type: 'varchar', length: 20 })
  estado_anterior: string;

  @Column({ type: 'varchar', length: 20 })
  estado_nuevo: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_cambio: Date;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @Column()
  id_usuario: number;

  @Column({ type: 'text', nullable: true })
  comentario: string;
}
