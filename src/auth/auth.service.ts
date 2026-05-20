import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Usuario } from '../entities/usuario.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const usuario = await this.usuarioRepo.findOne({ where: { correo: loginDto.correo } });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    if (usuario.estado === 'Inactivo') {
      throw new UnauthorizedException('Usuario inactivo');
    }

    const passwordValida = await bcrypt.compare(loginDto.contrasena, usuario.contrasena);
    if (!passwordValida) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    await this.usuarioRepo.update(usuario.id_usuario, { ultimo_acceso: new Date() });

    const payload = { sub: usuario.id_usuario, correo: usuario.correo, rol: usuario.rol };
    return {
      access_token: this.jwtService.sign(payload),
      usuario: {
        id_usuario: usuario.id_usuario,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
      },
    };
  }

  async perfil(id_usuario: number) {
    return this.usuarioRepo.findOne({ where: { id_usuario } });
  }
}
// Autenticacion JWT completada con guards
