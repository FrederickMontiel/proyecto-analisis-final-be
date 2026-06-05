import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { LoginThrottleService } from './login-throttle.service';
import { Usuario } from '../entities/usuario.entity';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let throttleService: LoginThrottleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        LoginThrottleService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('test_token'),
          },
        },
        {
          provide: getRepositoryToken(Usuario),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    throttleService = module.get<LoginThrottleService>(LoginThrottleService);
  });

  describe('Login', () => {
    it('should block account after 3 failed attempts', () => {
      const correo = 'test@example.com';

      throttleService.recordFailedAttempt(correo);
      throttleService.recordFailedAttempt(correo);
      throttleService.recordFailedAttempt(correo);

      expect(throttleService.isBlocked(correo)).toBe(true);
    });

    it('should clear attempts after successful login', () => {
      const correo = 'test@example.com';

      throttleService.recordFailedAttempt(correo);
      throttleService.clearAttempts(correo);

      expect(throttleService.isBlocked(correo)).toBe(false);
    });

    it('should return remaining block time', () => {
      const correo = 'test@example.com';

      throttleService.recordFailedAttempt(correo);
      throttleService.recordFailedAttempt(correo);
      throttleService.recordFailedAttempt(correo);

      const remaining = throttleService.getRemainingBlockTime(correo);
      expect(remaining).toBeGreaterThan(0);
    });
  });
});
