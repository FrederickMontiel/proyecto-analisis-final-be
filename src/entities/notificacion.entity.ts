import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

export enum TipoNotificacionEnum {
  ANUNCIO = 'Anuncio',
  ALERTA = 'Alerta',
  RECORDATORIO = 'Recordatorio',
  SISTEMA = 'Sistema',
}

@Entity('notificacion')
export class Notificacion {
  @PrimaryGeneratedColumn()
  id_notificacion: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario_destino' })
  usuarioDestino: Usuario;

  @Column()
  id_usuario_destino: number;

  @Column({ type: 'enum', enum: TipoNotificacionEnum })
  tipo: TipoNotificacionEnum;

  @Column({ length: 200 })
  titulo: string;

  @Column({ type: 'text' })
  mensaje: string;

  @CreateDateColumn()
  fecha_envio: Date;

  @Column({ default: false })
  leida: boolean;

  @Column({ type: 'timestamp', nullable: true })
  fecha_lectura: Date;

  @Column({ nullable: true })
  id_referencia: number;
}
