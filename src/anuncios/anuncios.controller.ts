import { Controller, Get, Post, Put, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AnuncioService } from './anuncios.service';

@ApiTags('anuncios')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('anuncios')
export class AnuncioController {
  constructor(private service: AnuncioService) {}

  @Get() findAll() { return this.service.findAll(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(+id); }
  @Post() create(@Body() data: any) { return this.service.create(data); }
  @Put(':id') update(@Param('id') id: string, @Body() data: any) { return this.service.update(+id, data); }
}// Pantalla anuncios flutter: tipos con colores Urgente=rojo, Mantenimiento=naranja
