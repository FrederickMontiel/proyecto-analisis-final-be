import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SessionTimeoutGuard extends AuthGuard('jwt') {
  private readonly sessionTimeout = 30 * 60 * 1000;

  canActivate(context) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) return false;

    try {
      const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
      const issuedAt = payload.iat * 1000;
      const now = Date.now();

      if (now - issuedAt > this.sessionTimeout) {
        return false;
      }

      return super.canActivate(context);
    } catch {
      return false;
    }
  }
}
