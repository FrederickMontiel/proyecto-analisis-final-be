import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'san_miguel_agua_secret_2026',
    });
  }

  async validate(payload: any) {
    const usuario = await this.usuarioRepo.findOne({ where: { id_usuario: payload.sub } });
    if (!usuario || usuario.estado === 'Inactivo') {
      throw new UnauthorizedException('Usuario no autorizado');
    }
    return { id_usuario: payload.sub, correo: payload.correo, rol: payload.rol };
  }
}
