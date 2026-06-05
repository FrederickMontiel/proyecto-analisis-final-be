import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { DistribucionService } from './distribucion.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('distribucion')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('distribucion')
export class DistribucionController {
  constructor(private service: DistribucionService) {}

  @Post('calendarios')
  @UseGuards(RolesGuard)
  @Roles('Presidente')
  crearCalendario(@Body() data: any) {
    return this.service.crearCalendario(data);
  }

  @Get('calendarios')
  obtenerCalendarios() {
    return this.service.obtenerCalendarios();
  }

  @Get('calendarios/:id')
  obtenerCalendario(@Param('id') id: string) {
    return this.service.obtenerCalendario(+id);
  }

  @Put('calendarios/:id')
  @UseGuards(RolesGuard)
  @Roles('Presidente')
  actualizarCalendario(@Param('id') id: string, @Body() data: any) {
    return this.service.actualizarCalendario(+id, data);
  }

  @Delete('calendarios/:id')
  @UseGuards(RolesGuard)
  @Roles('Presidente')
  eliminarCalendario(@Param('id') id: string) {
    return this.service.eliminarCalendario(+id);
  }

  @Post('calendarios/:idCalendario/detalles')
  @UseGuards(RolesGuard)
  @Roles('Presidente')
  agregarDetalle(@Param('idCalendario') idCalendario: string, @Body() data: any) {
    return this.service.agregarDetalle(+idCalendario, data);
  }

  @Get('sectores/:idSector/horarios')
  obtenerHorariosSector(@Param('idSector') idSector: string) {
    return this.service.obtenerDetallesPorSector(+idSector);
  }

  @Put('detalles/:idDetalle')
  @UseGuards(RolesGuard)
  @Roles('Presidente')
  actualizarDetalle(@Param('idDetalle') idDetalle: string, @Body() data: any) {
    return this.service.actualizarDetalle(+idDetalle, data);
  }

  @Delete('detalles/:idDetalle')
  @UseGuards(RolesGuard)
  @Roles('Presidente')
  eliminarDetalle(@Param('idDetalle') idDetalle: string) {
    return this.service.eliminarDetalle(+idDetalle);
  }
}
