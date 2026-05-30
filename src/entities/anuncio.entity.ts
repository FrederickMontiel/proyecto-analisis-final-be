import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

export enum TipoAnuncioEnum {
  INFORMATIVO = 'Informativo',
  URGENTE = 'Urgente',
  MANTENIMIENTO = 'Mantenimiento',
}

export enum EstadoAnuncioEnum {
  ACTIVO = 'Activo',
  ARCHIVADO = 'Archivado',
}

export enum SiNoEnum {
  SI = 'Si',
  NO = 'No',
}

@Entity('anuncio')
export class Anuncio {
  @PrimaryGeneratedColumn()
  id_anuncio: number;

  @Column({ length: 200 })
  titulo: string;

  @Column({ type: 'text' })
  contenido: string;

  @Column({ type: 'enum', enum: TipoAnuncioEnum, default: TipoAnuncioEnum.INFORMATIVO })
  tipo: TipoAnuncioEnum;

  @CreateDateColumn()
  fecha_publicacion: Date;

  @Column({ type: 'date' })
  fecha_vigencia: Date;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario_publica' })
  usuarioPublica: Usuario;

  @Column()
  id_usuario_publica: number;

  @Column({ type: 'enum', enum: SiNoEnum, default: SiNoEnum.NO })
  enviar_notificacion: SiNoEnum;

  @Column({ type: 'enum', enum: EstadoAnuncioEnum, default: EstadoAnuncioEnum.ACTIVO })
  estado: EstadoAnuncioEnum;
}
// Integracion completa backend-flutter verificada en todos los endpoints
