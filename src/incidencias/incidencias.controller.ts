import { Controller, Get, Post, Put, Param, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { IncidenciaService } from './incidencias.service';

@ApiTags('incidencias')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('incidencias')
export class IncidenciaController {
  constructor(private service: IncidenciaService) {}

  @Get() findAll() { return this.service.findAll(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(+id); }
  @Post() create(@Body() data: any) { return this.service.create(data); }
  @Put(':id') update(@Param('id') id: string, @Body() data: any, @Request() req: any) {
    return this.service.update(+id, data, req.user?.id_usuario);
  }
}

