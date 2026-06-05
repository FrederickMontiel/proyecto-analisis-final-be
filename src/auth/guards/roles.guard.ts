import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.rol) {
      throw new ForbiddenException('Usuario no autenticado o sin rol');
    }

    if (!requiredRoles.includes(user.rol)) {
      throw new ForbiddenException(`Rol '${user.rol}' no tiene permiso. Se requiere: ${requiredRoles.join(', ')}`);
    }

    return true;
  }
}
