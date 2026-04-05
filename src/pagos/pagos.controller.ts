import { Controller, Get, Post, Put, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PagoService } from './pagos.service';

@ApiTags('pagos')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('pagos')
export class PagoController {
  constructor(private service: PagoService) {}

  @Get() findAll() { return this.service.findAll(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(+id); }
  @Post() create(@Body() data: any) { return this.service.create(data); }
  @Put(':id') update(@Param('id') id: string, @Body() data: any) { return this.service.update(+id, data); }
}// Endpoint estado de cuenta: saldo pendiente, historial, estado moroso
