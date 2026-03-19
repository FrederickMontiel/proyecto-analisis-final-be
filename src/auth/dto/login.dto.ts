import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'presidente@sanmiguel.gt' })
  @IsEmail()
  correo: string;

  @ApiProperty({ example: 'contraseña123' })
  @IsString()
  @MinLength(6)
  contrasena: string;
}
