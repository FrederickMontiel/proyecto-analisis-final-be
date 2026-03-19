import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Sector } from './sector.entity';
import { Usuario } from './usuario.entity';

export enum TipoIncidenciaEnum {
  FUGA = 'Fuga',
  BOMBA = 'Bomba',
  VALVULA = 'Válvula',
  SIN_SUMINISTRO = 'SinSuministro',
  OTRO = 'Otro',
}

export enum NivelUrgenciaEnum {
  BAJA = 'Baja',
  MEDIA = 'Media',
  ALTA = 'Alta',
}

export enum EstadoIncidenciaEnum {
  REPORTADA = 'Reportada',
  EN_REVISION = 'EnRevisión',
  EN_ATENCION = 'EnAtención',
  RESUELTA = 'Resuelta',
  CANCELADA = 'Cancelada',
}

@Entity('incidencia')
export class Incidencia {
  @PrimaryGeneratedColumn()
  id_incidencia: number;

  @Column({ length: 20, unique: true })
  numero_incidencia: string;

  @Column({ type: 'enum', enum: TipoIncidenciaEnum })
  tipo_incidencia: TipoIncidenciaEnum;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ length: 200 })
  ubicacion: string;

  @ManyToOne(() => Sector, { nullable: true })
  @JoinColumn({ name: 'id_sector' })
  sector: Sector;

  @Column({ nullable: true })
  id_sector: number;

  @Column({ type: 'enum', enum: NivelUrgenciaEnum, default: NivelUrgenciaEnum.MEDIA })
  nivel_urgencia: NivelUrgenciaEnum;

  @Column({ type: 'enum', enum: EstadoIncidenciaEnum, default: EstadoIncidenciaEnum.REPORTADA })
  estado: EstadoIncidenciaEnum;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario_reporta' })
  usuarioReporta: Usuario;

  @Column()
  id_usuario_reporta: number;

  @CreateDateColumn()
  fecha_reporte: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_solucion: Date;

  @Column({ type: 'text', nullable: true })
  solucion_aplicada: string;

  @Column({ length: 255, nullable: true })
  foto_url: string;
}
