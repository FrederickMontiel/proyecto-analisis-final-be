import { Injectable } from '@nestjs/common';

interface LoginAttempt {
  count: number;
  blockedUntil?: number;
}

@Injectable()
export class LoginThrottleService {
  private attempts = new Map<string, LoginAttempt>();
  private readonly maxAttempts = 3;
  private readonly blockDurationMs = 15 * 60 * 1000;

  isBlocked(correo: string): boolean {
    const attempt = this.attempts.get(correo);
    if (!attempt) return false;

    if (attempt.blockedUntil && Date.now() < attempt.blockedUntil) {
      return true;
    }

    if (attempt.blockedUntil && Date.now() >= attempt.blockedUntil) {
      this.attempts.delete(correo);
      return false;
    }

    return false;
  }

  recordFailedAttempt(correo: string): void {
    const attempt = this.attempts.get(correo) || { count: 0 };
    attempt.count++;

    if (attempt.count >= this.maxAttempts) {
      attempt.blockedUntil = Date.now() + this.blockDurationMs;
    }

    this.attempts.set(correo, attempt);
  }

  clearAttempts(correo: string): void {
    this.attempts.delete(correo);
  }

  getRemainingBlockTime(correo: string): number {
    const attempt = this.attempts.get(correo);
    if (!attempt || !attempt.blockedUntil) return 0;

    const remaining = attempt.blockedUntil - Date.now();
    return remaining > 0 ? Math.ceil(remaining / 1000) : 0;
  }
}
