import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

export enum RolEnum {
  PRESIDENTE = 'Presidente',
  TESORERO = 'Tesorero',
  OPERADOR = 'Operador',
  HABITANTE = 'Habitante',
}

export enum EstadoEnum {
  ACTIVO = 'Activo',
  INACTIVO = 'Inactivo',
}

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100, unique: true, nullable: true })
  correo: string;

  @Column({ length: 15 })
  telefono: string;

  @Column({ length: 255 })
  contrasena: string;

  @Column({ type: 'enum', enum: RolEnum, default: RolEnum.HABITANTE })
  rol: RolEnum;

  @Column({ type: 'enum', enum: EstadoEnum, default: EstadoEnum.ACTIVO })
  estado: EstadoEnum;

  @CreateDateColumn()
  fecha_registro: Date;

  @Column({ type: 'timestamp', nullable: true })
  ultimo_acceso: Date;
}
// Produccion: NODE_ENV=production, CORS restringido, logs desactivados
