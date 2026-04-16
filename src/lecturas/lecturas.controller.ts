import { Controller, Get, Post, Put, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { LecturaContadorService } from './lecturas.service';

@ApiTags('lecturas')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('lecturas')
export class LecturaContadorController {
  constructor(private service: LecturaContadorService) {}

  @Get() findAll() { return this.service.findAll(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(+id); }
  @Post() create(@Body() data: any) { return this.service.create(data); }
  @Put(':id') update(@Param('id') id: string, @Body() data: any) { return this.service.update(+id, data); }
}// Analisis: consumo actual, promedio 3 meses, nivel Bajo/Normal/Alto/Critico
