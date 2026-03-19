import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, UpdateDateColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

export enum TipoDatoEnum {
  ENTERO = 'Entero',
  DECIMAL = 'Decimal',
  TEXTO = 'Texto',
  BOOLEANO = 'Booleano',
  FECHA = 'Fecha',
}

export enum CategoriaParametroEnum {
  SISTEMA = 'Sistema',
  FINANCIERO = 'Financiero',
  OPERATIVO = 'Operativo',
  ALERTAS = 'Alertas',
}

@Entity('parametros_sistema')
export class ParametrosSistema {
  @PrimaryGeneratedColumn()
  id_parametro: number;

  @Column({ length: 100, unique: true })
  clave: string;

  @Column({ length: 255 })
  valor: string;

  @Column({ type: 'enum', enum: TipoDatoEnum, default: TipoDatoEnum.TEXTO })
  tipo_dato: TipoDatoEnum;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ length: 50, nullable: true })
  unidad_medida: string;

  @Column({ type: 'enum', enum: CategoriaParametroEnum, default: CategoriaParametroEnum.SISTEMA })
  categoria: CategoriaParametroEnum;

  @UpdateDateColumn()
  fecha_modificacion: Date;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'id_usuario_modificador' })
  usuarioModificador: Usuario;

  @Column({ nullable: true })
  id_usuario_modificador: number;

  @Column({ default: true })
  activo: boolean;
}
