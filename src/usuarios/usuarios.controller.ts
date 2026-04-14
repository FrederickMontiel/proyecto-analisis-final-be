import { Controller, Get, Post, Put, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UsuariosService } from './usuarios.service';

@ApiTags('Usuarios')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('usuarios')
export class UsuariosController {
  constructor(private service: UsuariosService) {}

  @Get()
  findAll() { return this.service.findAll(); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.service.findOne(+id); }

  @Post()
  create(@Body() data: any) { return this.service.create(data); }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) { return this.service.update(+id, data); }

  @Put(':id/desactivar')
  desactivar(@Param('id') id: string) { return this.service.desactivar(+id); }
}
// Pruebas sprint 2: pagos, gastos, estado cuenta - correcciones aplicadas
