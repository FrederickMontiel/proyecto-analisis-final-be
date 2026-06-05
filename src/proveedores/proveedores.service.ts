import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proveedor } from '../entities/proveedor.entity';

@Injectable()
export class ProveedoresService {
  constructor(
    @InjectRepository(Proveedor)
    private readonly proveedorRepository: Repository<Proveedor>,
  ) {}

  async crear(data: {
    nombre_proveedor: string;
    especialidad?: string;
    telefono?: string;
    correo?: string;
    descripcion?: string;
  }): Promise<Proveedor> {
    if (!data.nombre_proveedor || data.nombre_proveedor.trim().length === 0) {
      throw new BadRequestException('Nombre de proveedor requerido');
    }

    const proveedor = this.proveedorRepository.create(data);
    return this.proveedorRepository.save(proveedor);
  }

  async obtenerTodos(): Promise<Proveedor[]> {
    return this.proveedorRepository.find({
      where: { activo: true },
      order: { nombre_proveedor: 'ASC' },
    });
  }

  async obtenerPorId(id: number): Promise<Proveedor> {
    const proveedor = await this.proveedorRepository.findOne({
      where: { id_proveedor: id },
    });
    if (!proveedor) {
      throw new BadRequestException('Proveedor no encontrado');
    }
    return proveedor;
  }

  async actualizar(
    id: number,
    data: {
      nombre_proveedor?: string;
      especialidad?: string;
      telefono?: string;
      correo?: string;
      descripcion?: string;
      activo?: boolean;
    },
  ): Promise<Proveedor> {
    const proveedor = await this.obtenerPorId(id);
    Object.assign(proveedor, data);
    return this.proveedorRepository.save(proveedor);
  }

  async desactivar(id: number): Promise<Proveedor> {
    return this.actualizar(id, { activo: false });
  }
}
