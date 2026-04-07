import { Controller, Get, Post, Put, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { GastoService } from './gastos.service';

@ApiTags('gastos')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('gastos')
export class GastoController {
  constructor(private service: GastoService) {}

  @Get() findAll() { return this.service.findAll(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(+id); }
  @Post() create(@Body() data: any) { return this.service.create(data); }
  @Put(':id') update(@Param('id') id: string, @Body() data: any) { return this.service.update(+id, data); }
}// Reporte transparencia: ingresos, gastos, balance, por periodo
