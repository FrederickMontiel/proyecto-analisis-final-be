import { Controller, Get, Post, Put, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ParametrosSistemaService } from './parametros.service';

@ApiTags('parametros')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('parametros')
export class ParametrosSistemaController {
  constructor(private service: ParametrosSistemaService) {}

  @Get() findAll() { return this.service.findAll(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(+id); }
  @Post() create(@Body() data: any) { return this.service.create(data); }
  @Put(':id') update(@Param('id') id: string, @Body() data: any) { return this.service.update(+id, data); }
}