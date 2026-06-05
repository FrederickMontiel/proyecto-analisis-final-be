import { Controller, Post, Body, Get, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginThrottleService } from './login-throttle.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private loginThrottle: LoginThrottleService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    if (this.loginThrottle.isBlocked(loginDto.correo)) {
      const remaining = this.loginThrottle.getRemainingBlockTime(loginDto.correo);
      throw new BadRequestException(
        `Cuenta bloqueada por intentos fallidos. Intente en ${remaining} segundos.`,
      );
    }

    try {
      const result = await this.authService.login(loginDto);
      this.loginThrottle.clearAttempts(loginDto.correo);
      return result;
    } catch (error) {
      this.loginThrottle.recordFailedAttempt(loginDto.correo);
      throw error;
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('perfil')
  perfil(@Request() req) {
    return this.authService.perfil(req.user.id_usuario);
  }
}
// Endpoint perfil verificado en pruebas sprint 1
