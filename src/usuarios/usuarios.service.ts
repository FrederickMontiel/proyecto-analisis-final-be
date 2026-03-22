import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario, RolEnum, EstadoEnum } from '../entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
  ) {}

  findAll() {
    return this.usuarioRepo.find({ select: ['id_usuario', 'nombre', 'correo', 'telefono', 'rol', 'estado', 'fecha_registro', 'ultimo_acceso'] });
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepo.findOne({ where: { id_usuario: id } });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return usuario;
  }

  async create(data: Partial<Usuario>) {
    const existe = await this.usuarioRepo.findOne({ where: { correo: data.correo } });
    if (existe) throw new ConflictException('El correo ya está registrado');

    const hash = await bcrypt.hash(data.contrasena || 'Temp1234!', 10);
    const usuario = this.usuarioRepo.create({ ...data, contrasena: hash });
    return this.usuarioRepo.save(usuario);
  }

  async update(id: number, data: Partial<Usuario>) {
    await this.findOne(id);
    await this.usuarioRepo.update(id, data);
    return this.findOne(id);
  }

  async desactivar(id: number) {
    await this.findOne(id);
    await this.usuarioRepo.update(id, { estado: EstadoEnum.INACTIVO });
    return { mensaje: 'Usuario desactivado correctamente' };
  }
}
// CRUD usuarios completo con hash bcrypt
