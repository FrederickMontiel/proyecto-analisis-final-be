import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('log_auditoria')
export class LogAuditoria {
  @PrimaryGeneratedColumn()
  id_log: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @Column()
  id_usuario: number;

  @Column({ length: 100 })
  accion: string;

  @Column({ length: 50 })
  tabla_afectada: string;

  @Column({ nullable: true })
  id_registro_afectado: number;

  @Column({ type: 'text', nullable: true })
  valor_anterior: string;

  @Column({ type: 'text', nullable: true })
  valor_nuevo: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @CreateDateColumn()
  fecha_hora: Date;

  @Column({ length: 45, nullable: true })
  ip_address: string;
}
